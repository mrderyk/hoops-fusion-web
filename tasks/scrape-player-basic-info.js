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

const STATES_TO_CODES = {
  'Arizona': 'AZ',
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District of Columbia': 'DC',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY',
};

const parsePlayerInfoFromPage = async (url) => {
  console.log('fetching player url: ', url)
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data.replaceAll('<!--', '').replaceAll('-->', ''));
    const metaInfoSection = $('#info > #meta');

    const imgEl = $('.media-item > img', metaInfoSection);
    const bbrefImgUrl = imgEl.attr('src');

    const twitterLinkEl = $("a[href^='https://twitter.com']", metaInfoSection)
    const twitter = !!$(twitterLinkEl).text() ? $(twitterLinkEl).text() : null;

    const instagramLinkEl = $("a[href^='https://instagram.com']", metaInfoSection)
    const instagram = !!$(instagramLinkEl).text() ? $(instagramLinkEl).text() : null

    const isActiveEl = $('strong:contains("Experience")', metaInfoSection);
    const isActive = !!$(isActiveEl).text();

    const birthCountryEl = $("a[href^='/friv/birthplaces.fcgi?']", metaInfoSection)
    let birthCountry;
    let birthCity;
    let birthState;

    const nbspRegExp = new RegExp(String.fromCharCode(160), 'g');

    if (!!$(birthCountryEl).text()) {
      birthCountry = $(birthCountryEl).attr('href').split('?')[1].split('&')[0].split('=')[1].trim();
      const cityStateParts = $(birthCountryEl).parent().text().replace(nbspRegExp, ' ').trim().split(',');

      birthCity = cityStateParts[0].replace("'", "''").replace('in ', '').trim();
      const potentialBirthState = cityStateParts.length === 2 ? cityStateParts[1].replace(nbspRegExp, ' ').trim() : null;
      console.log('potentialBirthState: ', potentialBirthState);
      birthState = STATES_TO_CODES[potentialBirthState] ?? null;
    }

    const perGameStatsRows = $("tr[id^='per_game']");
    const allTeamsPlayedFor = [];

    $(perGameStatsRows).each((index, perGameStatsRow) => {
      $('td', perGameStatsRow).each((index, td) => {
        if (index === 1) {
          allTeamsPlayedFor.push($(td).text());
        }
      });
    });
    
    let teamCode;
    if (isActive) {
      teamCode = allTeamsPlayedFor.pop();
    } else {
      const counts = {};
      let highestTeamCount = 0;
      allTeamsPlayedFor.forEach(team => {
        counts[team] = counts[team] ? counts[team] + 1 : 1;
      });

      for (const key in counts) { 
        if (counts[key] > highestTeamCount) {
          highestTeamCount = counts[key];
          teamCode = key;
        } 
      }
    }
    
    const numberEls = $("a[href^='/friv/numbers.cgi?number=']");
    const numbersWornCounts = {};
    $(numberEls).each((index, numberEl) => {
      const numberWorn = $(numberEl).attr('href').split('?')[1].split('=')[1].trim();
      numbersWornCounts[numberWorn] = numbersWornCounts[numberWorn] ? numbersWornCounts[numberWorn] + 1 : 1;
    });
    
    let number;
    let numberWornHighestCount = 0;
    for (const key in numbersWornCounts) { 
      if (numbersWornCounts[key] > numberWornHighestCount) {
        numberWornHighestCount = numbersWornCounts[key];
        number = key;
      } 
    }
  
    return [
      number,
      birthCity ?? null,
      birthState ?? null,
      birthCountry ?? null,
      teamCode,
      isActive,
      bbrefImgUrl,
      twitter,
      instagram
    ];

  } catch (e) {
    console.log('error: ', e);
  }    
};

(async () => {
  if (!process.argv[2]) {
    throw 'no letter input provided'
  }
  const playerPagesQuery = `SELECT key, bbref_url from players where last_name LIKE '${process.argv[2].toUpperCase()}%';`;
  const result = await pool.query(playerPagesQuery);
  
  result.rows.forEach((row, index) => {
    setTimeout(async () => {
      const playerInfo = await parsePlayerInfoFromPage(row.bbref_url);
      let teamCode;
      if (playerInfo[4] === 'CHH' || playerInfo[4] === 'CHO') {
        teamCode = 'CHA';
      } else if (playerInfo[4] === 'BRK') {
        teamCode = 'BKN';
      } else {
        teamCode = playerInfo[4];
      }

      const updatePlayerQuery = `
        UPDATE players 
        SET
          number = ${playerInfo[0] ? parseInt(playerInfo[0]) : null},
          birth_city = ${playerInfo[1] ? `'${playerInfo[1]}'` : null},
          birth_state = ${playerInfo[2] ? `'${playerInfo[2]}'` : null},
          birth_country = ${playerInfo[3] ? `'${playerInfo[3]}'` : null},
          team_code = '${teamCode}',
          is_active = ${playerInfo[5]},
          bbref_img_url = '${playerInfo[6]}',
          twitter = ${playerInfo[7] ? `'${playerInfo[7]}'` : null},
          instagram = ${playerInfo[8] ? `'${playerInfo[8]}'` : null}
        WHERE key = '${row.key}'
      `;
      console.log(`birth city: ${playerInfo[1] ? `'${playerInfo[1]}'` : null}`)
      console.log(`birth state: ${playerInfo[2] ? `'${playerInfo[2]}'` : null}`)
      console.log(`birth country: ${playerInfo[3] ? `'${playerInfo[3]}'` : null}`)
      console.log('\n');
      await pool.query(updatePlayerQuery);

    }, 1000 + (1000 * index));
  });

})();