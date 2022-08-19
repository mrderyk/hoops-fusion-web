import { gql } from "@apollo/client";

export const GET_PLAYER_STATS = gql`
  query GetPlayerStats($key: String) {
    getPlayerStatsPerGame(key: $key) {
      fg2a
      fg2m
      fg2pct
      fg3a
      fg3m
      fg3pct
      fga
      fgm
      fgpct
      fta
      ftm
      ftpct
      oreb
      dreb
      reb
      ast
      pts
      tov
      stl
      blk
      blka
      foulp
      mins
      season
      teamCode
      age
    }

    getPlayerStatsPerGamePlayoffs(key: $key) {
      fg2a
      fg2m
      fg2pct
      fg3a
      fg3m
      fg3pct
      fga
      fgm
      fgpct
      fta
      ftm
      ftpct
      oreb
      dreb
      reb
      ast
      pts
      tov
      stl
      blk
      blka
      foulp
      mins
      season
      teamCode
      age
    }

    getPlayerTotalsRegular(key: $key) {
      fg2a
      fg2m
      fg2pct
      fg3a
      fg3m
      fg3pct
      fga
      fgm
      fgpct
      fta
      ftm
      ftpct
      oreb
      dreb
      reb
      ast
      pts
      tov
      stl
      blk
      foulp
      mins
      trpDbl
      season
      teamCode
      age
    }

    getPlayerTotalsPlayoffs(key: $key) {
      fg2a
      fg2m
      fg2pct
      fg3a
      fg3m
      fg3pct
      fga
      fgm
      fgpct
      fta
      ftm
      ftpct
      oreb
      dreb
      reb
      ast
      pts
      tov
      stl
      blk
      foulp
      mins
      trpDbl
      season
      teamCode
      age
    }
  }
`;

export const GET_CHART_DATA = gql`
  query Query($keys: [String], $stat: String, $timeframe: String, $interval: String, $category: String) {
    getChartData(keys: $keys, stat: $stat, timeframe: $timeframe, interval: $interval, category: $category) {
      player_key
      interval
      stat
      player_name
    }
  }
`;

export const GET_PLAYER_SOCIALS = gql`
  query GetPlayerSocials($key: String){
    getPlayerSocials(key: $key) {
      youtubeVideoIds,
      sneakerTokens
    }
  }
`;
