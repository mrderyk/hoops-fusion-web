import React from "react";
import { StatsTableHeader, StyledStatsTable, StyledTable, TableCell, TableHeader, TableRow, TableTitle } from "./styled";
import getUuid from 'uuid-by-string';

export type GameStats = {[key: string]: string};

export type TableData = {
  title: string;
  headers: string[];
  contents: (string|number|React.ReactNode)[][];
  cellStyles?: {[key: string]: string|number};
}

export const Table: React.FC<TableData> = ({ title, headers, contents, cellStyles }) => {
  return (
    <>
      <TableTitle>{title}</TableTitle>
      <StyledTable cellSpacing={0} cellPadding={0}>
        <thead>
            <tr>
            {
              headers.map((tableHeader: string) => (
                <TableHeader
                  key={tableHeader}
                  style={{
                    width: tableHeader === '' ? '1px': 'auto'
                  }}
                >
                  {tableHeader}
                </TableHeader>
              ))
            }
            </tr>
          </thead>
          <tbody>
            {
              contents.map((contentsArray: (string|number|React.ReactNode)[], rowIndex: number) => {
                const tableRowKey = getUuid(`${title}_${rowIndex}`);
                return (
                  <TableRow key={tableRowKey}>
                  {
                    contentsArray.map((content: string|number|React.ReactNode, cellIndex: number) => {
                      const tableCellKey = getUuid(`${title}_${rowIndex}_${cellIndex}`);
                      return <TableCell key={Math.random()} style={cellStyles ?? {}}>{content}</TableCell>
                    })
                  }  
                  </TableRow>
                );
              })
            }
          </tbody>
      </StyledTable>
    </>
  );
};

export const StatsTable: React.FC<{ title: string; stats: GameStats[] }> = ({ title, stats }) => {
  let tableHeaders: string[] = [];
  const statsArrays: (string|number)[][] = [];

  STAT_TO_DISPLAY_STAT.forEach((value: string, key: string) => {
    if (stats[0][key] !== undefined) {
      tableHeaders.push(value);
    }
  });

  stats.forEach((seasonStats: GameStats) => {
    const statsArray: (string|number)[] = [];

    STAT_TO_DISPLAY_STAT.forEach((value: string, key: string) => {
      if (seasonStats[key] !== undefined) {
        statsArray.push(seasonStats[key]);
      }
    });

    statsArrays.push(statsArray);
  });

  return (
    <>
      <TableTitle>{title}</TableTitle>
      <StyledStatsTable cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
          {
            tableHeaders.map((tableHeader: string) => <StatsTableHeader key={tableHeader} style={{}}>{tableHeader}</StatsTableHeader>)
          }
          </tr>
        </thead>
        <tbody>
          {
            statsArrays.map((statsArray: (string|number)[], rowIndex: number) => {
              return (
                <TableRow key={Math.random()}>
                {
                  statsArray.map((stat: string|number, cellIndex: number) => <TableCell key={Math.random()}>{stat}</TableCell>)
                }  
                </TableRow>
              );
            })
          }
        </tbody>
      </StyledStatsTable>
    </>
  )
};

const STAT_TO_DISPLAY_STAT = new Map(Object.entries({
  season: 'SEASON',
  age: 'AGE',
  teamCode: 'TEAM',
  mins: 'MIN',
  pts: 'PTS',
  ast: 'AST',
  reb: 'REB',
  fg2a: 'FG2A',
  fg2m: 'FG2M',
  fg2pct: 'FG2%',
  fg3a: 'FG3A',
  fg3m: 'FG3M',
  fg3pct: 'FG3%',
  fga: 'FGA', 
  fgm: 'FGM',
  fgpct: 'FG%',
  fta: 'FTA',
  ftm: 'FTM',  
  ftpct: 'FT%', 
  oreb: 'OREB',
  dreb: 'DREB',
  tov: 'TOV',
  stl: 'STL',
  blk: 'BLK',
  foulp: 'FOUL',
  trpDbl: 'TRP DBL',
}));
