const axios = require('axios');
const cheerio = require('cheerio');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hoopsfusion',
  password: 'password',
  port: 5432,
});

const SELECTORS = {
  STATS_TABLE_PER_GAME: '.stats_table#per_game',
  STATS_TABLE_PLAYOFFS_PER_GAME: '.stats_table#playoffs_per_game',
  STATS_TABLE_TOTALS: '.stats_table#totals',
  STATS_TABLE_PLAYOFFS_TOTALS: '.stats_table#playoffs_totals',
  STATS_TABLE_PER_36: '.stats_table#per_minute',
  STATS_TABLE_PLAYOFFS_PER_36: '.stats_table#playoffs_per_minute',
  STATS_TABLE_PER_POSS: '.stats_table#per_poss',
  STATS_TABLE_PLAYOFFS_PER_POSS: '.stats_table#playoffs_per_poss',
}

const parseSeason = (seasonString) => {
  const seasonParts = seasonString.split('-');
    // e.g. for '2003' => '20
    const seasonYearPrefix = seasonParts[0] === '1999' ? '20' : `${seasonParts[0].charAt(0)}${seasonParts[0].charAt(1)}`;
    return `${seasonParts[0]}-${seasonYearPrefix}${seasonParts[1]}`;
};

const buildGameStats = (tableValues) => {
  return tableValues.map(values => {
    return {
      season: parseSeason(values['Season']),
      age: values['Age'],
      team: values['Tm'],
      league: values['Lg'],
      position: values['Pos'],
      games: values['G'],
      gamesStarted: values['GS'],
      minutes: values['MP'],
      fg: values['FG'],
      fga: values['FGA'],
      fgPct: values['FG%'],
      fg3: values['3P'],
      fg3a: values['3PA'],
      fg3Pct: values['3P%'],
      fg2: values['2P'],
      fg2a: values['2PA'],
      fg2Pct: values['2P%'],
      efgPct: values['eFG%'],
      ft: values['FT'],
      fta: values['FTA'],
      ftPct: values['FT%'],
      oReb: values['ORB'],
      dReb: values['DRB'],
      reb: values['TRB'],
      ast: values['AST'],
      stl: values['STL'],
      blk: values['BLK'],
      tov: values['TOV'],
      pf: values['PF'],
      pts: values['PTS'],
    }
  });
};

const buildPer36Stats = (tableValues) => {
  return tableValues.map(values => ({
    season: parseSeason(values['Season']),
    age: values['Age'],
    team: values['Tm'],
    league: values['Lg'],
    position: values['Pos'],
    games: values['G'],
    gamesStarted: values['GS'],
    minutes: values['MP'],
    fg: values['FG'],
    fga: values['FGA'],
    fgPct: values['FG%'],
    fg3: values['3P'],
    fg3a: values['3PA'],
    fg3Pct: values['3P%'],
    fg2: values['2P'],
    fg2a: values['2PA'],
    fg2Pct: values['2P%'],
    ft: values['FT'],
    fta: values['FTA'],
    ftPct: values['FT%'],
    oReb: values['ORB'],
    dReb: values['DRB'],
    reb: values['TRB'],
    ast: values['AST'],
    stl: values['STL'],
    blk: values['BLK'],
    tov: values['TOB'],
    pf: values['PF'],
    pts: values['PTS'],
  }));
};

const buildPer100PossStats = (tableValues) => {
  return tableValues.map(values => ({
    season: parseSeason(values['Season']),
    age: values['Age'],
    team: values['Tm'],
    league: values['Lg'],
    position: values['Pos'],
    games: values['G'],
    gamesStarted: values['GS'],
    minutes: values['MP'],
    fg: values['FG'],
    fga: values['FGA'],
    fgPct: values['FG%'],
    fg3: values['3P'],
    fg3a: values['3PA'],
    fg3Pct: values['3P%'],
    fg2: values['2P'],
    fg2a: values['2PA'],
    fg2Pct: values['2P%'],
    ft: values['FT'],
    fta: values['FTA'],
    ftPct: values['FT%'],
    oReb: values['ORB'],
    dReb: values['DRB'],
    reb: values['TRB'],
    ast: values['AST'],
    stl: values['STL'],
    blk: values['BLK'],
    tov: values['TOV'],
    pf: values['PF'],
    pts: values['PTS'],
    ortg: values['ORtg'],
    drtg: values['DRtg'],
  }));
};

const buildTotalsStats = (tableValues) => {
  return tableValues.map(values => ({
    season: parseSeason(values['Season']),
    age: values['Age'],
    team: values['Tm'],
    league: values['Lg'],
    position: values['Pos'],
    games: values['G'],
    gamesStarted: values['GS'],
    minutes: values['MP'],
    fg: values['FG'],
    fga: values['FGA'],
    fgPct: values['FG%'],
    fg3: values['3P'],
    fg3a: values['3PA'],
    fg3Pct: values['3P%'],
    fg2: values['2P'],
    fg2a: values['2PA'],
    fg2Pct: values['2P%'],
    efgPct: values['eFG%'],
    ft: values['FT'],
    fta: values['FTA'],
    ftPct: values['FT%'],
    oReb: values['ORB'],
    dReb: values['DRB'],
    reb: values['TRB'],
    ast: values['AST'],
    stl: values['STL'],
    blk: values['BLK'],
    tov: values['TOV'],
    pf: values['PF'],
    pts: values['PTS'],
    tds: values['Trp Dbl'] ?? 0,
  }));
};

getValuesFromTable = (table, $) => {
  const thead = $('thead', table);
  const tbody = $('tbody', table);
  const tableValues = [];
  const columnHeaders = [];

  // get headers
  $('tr', thead).each((i, tr) => {    
    $('th', tr).each((j, th) => {
      const text = $(th).text();
      columnHeaders.push(text);
    });
  });

  // get values
  $('tr', tbody).each((i, tr) => {
    const rowValues = {};
    $('th, td', tr).each((j, td) => {
      const text = $(td).text();

      if (columnHeaders[j]) {
        rowValues[columnHeaders[j]] = text === '' ? null : text;
      }
    });

    tableValues.push(rowValues);
  });
  
  return tableValues
};

const getGameStatsFromTable = (table, $) => {
  const tableValues = getValuesFromTable(table, $);
  return buildGameStats(tableValues);
}

const getPer36MinsStatsFromTable = (table, $) => {
  const tableValues = getValuesFromTable(table, $);
  return buildPer36Stats(tableValues);
}

const getTotalsFromTable = (table, $) => {
  const tableValues = getValuesFromTable(table, $);
  return buildTotalsStats(tableValues);
}

const getPer100PossStatsFromTable = (table, $) => {
  const tableValues = getValuesFromTable(table, $);
  return buildPer100PossStats(tableValues);
}

(async () => {
  const playerPagesQuery = `SELECT key, bbref_url from players where last_name LIKE '${process.argv[2].toUpperCase()}%';`;
  const result = await pool.query(playerPagesQuery);
  
  result.rows.forEach((row, index) => {
    setTimeout(async () => {
      const url = row.bbref_url;
      const playerKey = row.key;
      let query;
    
      console.log('fetching stats from: ', url)

      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data.replaceAll('<!--', '').replaceAll('-->', ''));
        const stats = {
          perGame: getGameStatsFromTable($(SELECTORS.STATS_TABLE_PER_GAME), $),
          playoffsPerGame: getGameStatsFromTable($(SELECTORS.STATS_TABLE_PLAYOFFS_PER_GAME), $),
          //per36: getPer36MinsStatsFromTable($(SELECTORS.STATS_TABLE_PER_36), $),
          //playoffsPer36: getPer36MinsStatsFromTable($(SELECTORS.STATS_TABLE_PLAYOFFS_PER_36), $),
          //per100Poss: getPer100PossStatsFromTable($(SELECTORS.STATS_TABLE_PER_POSS), $),
          //playoffsPer100Poss: getPer100PossStatsFromTable($(SELECTORS.STATS_TABLE_PLAYOFFS_PER_POSS), $),
          totals: getTotalsFromTable($(SELECTORS.STATS_TABLE_TOTALS), $),
          playoffsTotals: getTotalsFromTable($(SELECTORS.STATS_TABLE_PLAYOFFS_TOTALS), $),
        }
    
        // update stats - regular season
        // per game
        stats.perGame.forEach(async (s) => {
          query = createGameStatsUpsertQuery(playerKey, 'player_stats_per_game_regular', s);
          try {
            await pool.query(query);
          } catch (e) {

          }
          
        });
    
        // totals
        stats.totals.forEach(async (s) => {
          query = createTotalStatsUpsertQuery(playerKey, 'player_totals_regular', s);
          try {
            await pool.query(query);
          } catch (e) {
            
          }
        });
    
        // update per game stats - playoffs
        // per game
        stats.playoffsPerGame.forEach(async (s) => {
          query = createGameStatsUpsertQuery(playerKey, 'player_stats_per_game_playoffs', s);
          try {
            await pool.query(query);
          } catch (e) {
            
          }
        });
    
        // totals
        stats.playoffsTotals.forEach(async (s) => {
          query = createTotalStatsUpsertQuery(playerKey, 'player_totals_playoffs', s);

          try {
            await pool.query(query);
          } catch (e) {
            
          }
        });
    
      } catch (e) {
        console.log(e);
      }
    }, 1000 + (1000 * index))
  });
})();

const createGameStatsUpsertQuery = (playerKey, tableName, s) => {
  return `
    INSERT INTO ${tableName} (
      player_key,
      fg2a,
      fg2m,
      fg2pct,
      fg3a,
      fg3m,
      fg3pct,
      fga,
      fgm,
      fgpct,
      fta,
      ftm,
      ftpct,
      oreb,
      dreb,
      reb,
      ast,
      pts,
      tov,
      stl,
      blk,
      foulp,
      mins,
      season,
      team_code,
      age,
      key
    ) VALUES (
      '${playerKey}',
      ${s.fg2a ?? null},
      ${s.fg2 ?? null},
      ${s.fg2Pct ?? null},
      ${s.fg3a ?? null},
      ${s.fg3 ?? null},
      ${s.fg3Pct ?? null},
      ${s.fga ?? null},
      ${s.fg ?? null},
      ${s.fgPct ?? null},
      ${s.fta ?? null},
      ${s.ft ?? null},
      ${s.ftPct ?? null},
      ${s.oReb ?? null},
      ${s.dReb ?? null},
      ${s.reb ?? null},
      ${s.ast ?? null},
      ${s.pts ?? null},
      ${s.tov ?? null},
      ${s.stl ?? null},
      ${s.blk ?? null},
      ${s.pf ?? null},
      ${s.minutes ?? null},
      '${s.season}',
      '${s.team ?? null}',
      '${s.age ?? null}',
      '${playerKey}_${s.season}_${s.team}'
    ) ON CONFLICT (key)
    DO UPDATE SET
      fg2a = ${s.fg2a ?? null},
      fg2m = ${s.fg2 ?? null},
      fg2pct = ${s.fg2Pct ?? null},
      fg3a = ${s.fg3a ?? null},
      fg3m = ${s.fg3 ?? null},
      fg3pct = ${s.fg3Pct ?? null},
      fga = ${s.fga ?? null},
      fgm = ${s.fg ?? null},
      fgpct = ${s.fgPct ?? null},
      fta = ${s.fta ?? null},
      ftm = ${s.ft ?? null},
      ftpct = ${s.ftPct ?? null},
      oreb = ${s.oReb ?? null},
      dreb = ${s.dReb ?? null},
      reb = ${s.reb ?? null},
      ast = ${s.ast ?? null},
      pts = ${s.pts ?? null},
      tov = ${s.tov ?? null},
      stl = ${s.stl ?? null},
      blk = ${s.blk ?? null},
      foulp = ${s.pf ?? null},
      mins = ${s.minutes ?? null}
    ;
  `
}

const createTotalStatsUpsertQuery = (playerKey, tableName, s) => {
  return `
    INSERT INTO ${tableName} (
      player_key,
      g, 
      gs,
      fg2a, 
      fg2m, 
      fg2pct, 
      fg3a, 
      fg3m, 
      fg3pct, 
      fga, 
      fgm, 
      fgpct, 
      fta, 
      ftm, 
      ftpct, 
      oreb, 
      dreb, 
      reb, 
      ast, 
      pts, 
      tov, 
      stl, 
      blk, 
      foulp, 
      mins, 
      trpdbl, 
      season,
      team_code,
      age, 
      key
    ) VALUES (
      '${playerKey}',
      ${s.games},
      ${s.gamesStarted},
      ${s.fg2a ?? null},
      ${s.fg2 ?? null},
      ${s.fg2Pct ?? null},
      ${s.fg3a ?? null},
      ${s.fg3 ?? null},
      ${s.fg3Pct ?? null},
      ${s.fga ?? null},
      ${s.fg ?? null},
      ${s.fgPct ?? null},
      ${s.fta ?? null},
      ${s.ft ?? null},
      ${s.ftPct ?? null},
      ${s.oReb ?? null},
      ${s.dReb ?? null},
      ${s.reb ?? null},
      ${s.ast ?? null},
      ${s.pts ?? null},
      ${s.tov ?? null},
      ${s.stl ?? null},
      ${s.blk ?? null},
      ${s.pf ?? null},
      ${s.minutes ?? null},
      ${s.tds ?? null},
      '${s.season}',
      '${s.team ?? null}',
      ${s.age ?? null},
      '${playerKey}_${s.season}_${s.team}'
    ) ON CONFLICT (key)
    DO UPDATE SET
      g = ${s.games ?? null},
      gs = ${s.gamesStarted ?? null},
      fg2a = ${s.fg2a ?? null},
      fg2m = ${s.fg2 ?? null},
      fg2pct = ${s.fg2Pct ?? null},
      fg3a = ${s.fg3a ?? null},
      fg3m = ${s.fg3 ?? null},
      fg3pct = ${s.fg3Pct ?? null},
      fga = ${s.fga ?? null},
      fgm = ${s.fg ?? null},
      fgpct = ${s.fgPct ?? null},
      fta = ${s.fta ?? null},
      ftm = ${s.ft ?? null},
      ftpct = ${s.ftPct ?? null},
      oreb = ${s.oReb ?? null},
      dreb = ${s.dReb ?? null},
      reb = ${s.reb ?? null},
      ast = ${s.ast ?? null},
      pts = ${s.pts ?? null},
      tov = ${s.tov ?? null},
      stl = ${s.stl ?? null},
      blk = ${s.blk ?? null},
      foulp = ${s.pf ?? null},
      mins = ${s.minutes ?? null},
      trpdbl = ${s.tds ?? null}
    ;
  `
};