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