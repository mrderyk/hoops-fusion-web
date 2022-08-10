const axios = require('axios');
const cheerio = require('cheerio');
const getUuid = require('uuid-by-string');
const format = require('pg-format');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hoopsfusion',
  password: 'password',
  port: 5432,
});

const LETTERS = [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 
  'm', 'n', 'o', 'p', 'q', 'r', 
  's', 't', 'u', 'v', 'w', 'x',
  'y', 'z'
];

const MONTH_TO_NUMBER = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12'
}

const URL_ROOT = 'https://www.basketball-reference.com';
const PLAYERS_INDEX_URL_ROOT = 'https://www.basketball-reference.com/players';

const getSubstrings = (str) => {
  let i, j, result = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length + 1; j++) {
      result.push(str.slice(i, j).toLowerCase());
    }
  }
  return result;
}

const parsePlayerDetails = (playerDetails) => {
  const firstName = playerDetails[0].replace('*', '');
  const lastName = playerDetails[1].replace('*', '');
  const bbRefUrl = playerDetails[2];
  const draftYear = playerDetails[3];
  const position = playerDetails[5];
  const srcHeight = playerDetails[6];
  const weight = !!playerDetails[7] ? parseInt(playerDetails[7]) : null;
  const srcBirthdate = playerDetails[8].replace(',', '');
  const [heightFeet, heightInches] = srcHeight ? srcHeight.split('-') : [null, null];
  const height = !!heightFeet && !!heightInches ? parseInt(heightFeet) * 12 + parseInt(heightInches) : null;
  const [birthdateMonth, birthdateDay, birthdateYear] = srcBirthdate.split(' ');
  const dob = `${birthdateYear}-${MONTH_TO_NUMBER[birthdateMonth.toLowerCase()]}-${birthdateDay < 10 ? `0${birthdateDay}` : birthdateDay}`;

  return [
    getUuid(`${lastName}_${firstName}_${dob}`),
    firstName,
    lastName,
    draftYear,
    position,
    height,
    weight,
    birthdateYear ? dob : null,
    bbRefUrl
  ];
};

const populatePlayersForLetter = async (index) => {
  const letter = LETTERS[index];
  const url = `${PLAYERS_INDEX_URL_ROOT}/${letter}/`;
  const playerDetailsForLetter = [];
  console.log(`populating players for letter ${letter}...`)

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data.replaceAll('<!--', '').replaceAll('-->', ''));
    const playerRows = $('table#players > tbody > tr');
    
    $(playerRows).each((i, tr) => {
      const values = [];

      $('th, td', tr).each((j, td) => {
        const text = $(td).text();

        // Compute for first name, last name, bb ref url.
        if (values.length === 0) {
          const link = $('a', td).attr('href');
          const bbRefUrl = `${URL_ROOT}${link}`;
          const [firstName, ...lastName] = text.split(' ');
          values.push(firstName, lastName.join(' '), bbRefUrl);
        } else {
          values.push(text);
        }
      });

      playerDetailsForLetter.push(values);
    });

    if (!!playerDetailsForLetter.length) {
      const playerDataToWrite = playerDetailsForLetter.map(playerDetails => parsePlayerDetails(playerDetails));
      const queryFormat = `
        INSERT INTO players (
          key,
          first_name,
          last_name,
          draft_year,
          position,
          height,
          weight,
          dob,
          bbref_url
        ) VALUES %L returning id
      `;

      await pool.query(format(queryFormat, playerDataToWrite));

      playerDataToWrite.forEach(async (data)=> {
        const searchTokens = [...getSubstrings(`${data[1]} ${data[2]}`)];
        const queryFormat = `
          UPDATE players
          SET search_tokens = ARRAY[%L]
          WHERE key = '%s'
        `;

        await pool.query(format(queryFormat, searchTokens, data[0]));
      });
    }
    
  } catch (e) {
    console.log('Error populating data: ', e);
  }

  if (index < 25) {
    setTimeout(() => populatePlayersForLetter(index + 1), 2000)
  } else {
    console.log('ending pool')
    pool.end();
  }
};

(async () => {
  populatePlayersForLetter(0);
})();