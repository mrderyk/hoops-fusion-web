import { Table, TableCell, TableHeader, TableRow, TableTitle } from "./styled";

export type PerGameStats = {[key: string]: string};

export const StatsTable: React.FC<{ title: string; stats: PerGameStats[] }> = ({ title, stats }) => {
  let tableHeaders: string[] = [];
  const statsArrays: (string|number)[][] = [];

  STAT_TO_DISPLAY_STAT.forEach((value: string, key: string) => {
    if (stats[0][key] !== undefined) {
      tableHeaders.push(value);
    }
  });

  stats.forEach((seasonStats: PerGameStats) => {
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
      <Table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
          {
            tableHeaders.map((tableHeader: string) => <TableHeader key={tableHeader}>{tableHeader}</TableHeader>)
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
      </Table>
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
