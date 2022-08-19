import {useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  SectionHeader,
  SectionSubheader,
  SectionInnerWrapper,
  SectionWrapper
} from '../../../../shared-components/page';
import { GET_PLAYER_STATS } from '../../../../shared-queries';
import { Charts } from '../../../../shared-components/Charts';
import { ChartData } from '../../../../widgets/Chart';


interface StatsProps {
  playerKey: string;
}

type TrendData = {
  [key: string]: {
    [key: string]: ChartData
  }
}

type GameStats = {[key: string]: string|number};

export const Trends: React.FC<StatsProps> = ({ playerKey }) => {
  const [trendData, setTrendData] = useState<TrendData | null>(null);

  const onStatsFetched = (stats: {[key: string]: GameStats[]}) => {
    setTrendData({
      regSeason: {
        'base averages': {
          xAxisLabels: stats.regSeason.map((stats: GameStats) => stats.season as string),
          dataset: {
            'Points Per Game': stats.regSeason.map((stats: GameStats) => stats.pts as number),
            'Assists Per Game': stats.regSeason.map((stats: GameStats) => stats.ast as number),
            'Rebounds Per Game': stats.regSeason.map((stats: GameStats) => stats.reb as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'AVERAGE PER GAME',
        },

        'scoring percentages': {
          xAxisLabels: stats.regSeason.map((stats: GameStats) => stats.season as string),
          dataset: {
            'FG%': stats.regSeason.map((stats: GameStats) => stats.fgpct as number),
            '2pt FG%': stats.regSeason.map((stats: GameStats) => stats.fg2pct as number),
            '3pt FG%': stats.regSeason.map((stats: GameStats) => stats.fg3pct as number),
            'FT%': stats.regSeason.map((stats: GameStats) => stats.ftpct as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'PERCENTAGE PER GAME',
        },

        'offensive averages': {
          xAxisLabels: stats.regSeason.map((stats: GameStats) => stats.season as string),
          dataset: {
            'Points Per Game': stats.regSeason.map((stats: GameStats) => stats.pts as number),
            'Assists Per Game': stats.regSeason.map((stats: GameStats) => stats.ast as number),
            'Off. Rebounds Per Game': stats.regSeason.map((stats: GameStats) => stats.oreb as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'AVERAGE PER GAME',
        },

        'defensive averages': {
          xAxisLabels: stats.regSeason.map((stats: GameStats) => stats.season as string),
          dataset: {
            'Steals Per Game': stats.regSeason.map((stats: GameStats) => stats.stl as number),
            'Blocks Per Game': stats.regSeason.map((stats: GameStats) => stats.blk as number),
            'Def. Rebounds Per Game': stats.regSeason.map((stats: GameStats) => stats.dreb as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'AVERAGE PER GAME',
        },
      },
      playoffs: {
        'base averages': {
          xAxisLabels: stats.playoffs.map((stats: GameStats) => stats.season as string),
          dataset: {
            'Points Per Game': stats.playoffs.map((stats: GameStats) => stats.pts as number),
            'Assists Per Game': stats.playoffs.map((stats: GameStats) => stats.ast as number),
            'Rebounds Per Game': stats.playoffs.map((stats: GameStats) => stats.reb as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'AVERAGE PER GAME',
        },

        'scoring percentages': {
          xAxisLabels: stats.playoffs.map((stats: GameStats) => stats.season as string),
          dataset: {
            'FG%': stats.playoffs.map((stats: GameStats) => stats.fgpct as number),
            '2pt FG%': stats.playoffs.map((stats: GameStats) => stats.fg2pct as number),
            '3pt FG%': stats.playoffs.map((stats: GameStats) => stats.fg3pct as number),
            'FT%': stats.playoffs.map((stats: GameStats) => stats.ftpct as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'PERCENTAGE PER GAME',
        },

        'offensive averages': {
          xAxisLabels: stats.playoffs.map((stats: GameStats) => stats.season as string),
          dataset: {
            'Points Per Game': stats.playoffs.map((stats: GameStats) => stats.pts as number),
            'Assists Per Game': stats.playoffs.map((stats: GameStats) => stats.ast as number),
            'Off. Rebounds Per Game': stats.playoffs.map((stats: GameStats) => stats.oreb as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'AVERAGE PER GAME',
        },

        'defensive averages': {
          xAxisLabels: stats.playoffs.map((stats: GameStats) => stats.season as string),
          dataset: {
            'Steals Per Game': stats.playoffs.map((stats: GameStats) => stats.stl as number),
            'Blocks Per Game': stats.playoffs.map((stats: GameStats) => stats.blk as number),
            'Def. Rebounds Per Game': stats.playoffs.map((stats: GameStats) => stats.dreb as number),
          },
          xAxisTitle: 'YEAR',
          yAxisTitle: 'AVERAGE PER GAME',
        },
      },
    });
  };

  const { loading } = useQuery(GET_PLAYER_STATS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      onStatsFetched({
        regSeason: data.getPlayerStatsPerGame,
        playoffs: data.getPlayerStatsPerGamePlayoffs,
      });
    }
  });

  
  return (
    <SectionWrapper>
      <a id="trends"/>
      <SectionHeader>CAREER TRENDS</SectionHeader>
      <SectionInnerWrapper>
        <SectionSubheader>Regular Season</SectionSubheader>
        {
          trendData && 
          <Charts charts={trendData.regSeason}/>
        }
        <SectionSubheader>Playoffs</SectionSubheader>
        {
          trendData && 
          <Charts charts={trendData.playoffs}/>
        }
      </SectionInnerWrapper>
    </SectionWrapper>
  );
}
