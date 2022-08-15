import {gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { SectionHeader, SectionSubheader } from '../../styled';
import { SectionInnerWrapper, SectionWrapper } from '../../../../shared-components/SectionWrapper';
import { GameStats, StatsTable } from '../../../../widgets/Tables';

interface StatsProps {
  playerKey: string;
}

export const Stats: React.FC<StatsProps> = ({ playerKey }) => {
  return (
    <SectionWrapper>
      <a id="stats"/>
      <SectionHeader>CAREER STATS</SectionHeader>
      <SectionInnerWrapper>
        <SectionSubheader>Regular Season</SectionSubheader>
        <StatsPerGameRegular playerKey={playerKey} />
        <StatsTotalsRegular playerKey={playerKey} />
        <SectionSubheader>Playoffs</SectionSubheader>
        <StatsPerGamePlayoffs playerKey={playerKey} />
        <StatsTotalsPlayoffs playerKey={playerKey} />
      </SectionInnerWrapper>
    </SectionWrapper>
  );
}

const StatsPerGameRegular: React.FC<StatsProps> = ({ playerKey }) => {
  const [perGameStatsRegular, setGameStatsRegular] = useState<GameStats[] | null>(null);
  const { loading } = useQuery(GET_PLAYER_STATS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      setGameStatsRegular(data.getPlayerStatsPerGame);
    }
  });

  return (
    <>
    {
      perGameStatsRegular && perGameStatsRegular.length > 0 && 
      <StatsTable title={'per game'} stats={perGameStatsRegular} />
    }
    </>
  );
};

const StatsPerGamePlayoffs: React.FC<StatsProps> = ({ playerKey }) => {
  const [stats, setStats] = useState<GameStats[] | null>(null);
  const { loading } = useQuery(GET_PLAYER_STATS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      setStats(data.getPlayerStatsPerGamePlayoffs);
    }
  });

  return (
    <>
    {
      stats && stats.length > 0 && 
      <StatsTable title={'per game'} stats={stats} />
    }
    </>
  );
};

const StatsTotalsRegular: React.FC<StatsProps> = ({ playerKey }) => {
  const [stats, setStats] = useState<GameStats[] | null>(null);
  const { loading } = useQuery(GET_PLAYER_STATS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      setStats(data.getPlayerTotalsRegular);
    }
  });

  return (
    <>
    {
      stats && stats.length > 0 && 
      <StatsTable title={'totals'} stats={stats} />
    }
    </>
  );
};

const StatsTotalsPlayoffs: React.FC<StatsProps> = ({ playerKey }) => {
  const [stats, setStats] = useState<GameStats[] | null>(null);
  const { loading } = useQuery(GET_PLAYER_STATS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      setStats(data.getPlayerTotalsPlayoffs);
    }
  });

  return (
    <>
    {
      stats && stats.length > 0 && 
      <StatsTable title={'totals'} stats={stats} />
    }
    </>
  );
};

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

