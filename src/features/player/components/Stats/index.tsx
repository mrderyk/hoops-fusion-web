import {useQuery } from '@apollo/client';
import { useState } from 'react';
import { SectionHeader, SectionSubheader } from '../../styled';
import { GET_PLAYER_STATS } from '../../../../../lib/queries';
import { SectionInnerWrapper, SectionWrapper } from '../../../../shared-components/SectionWrapper';
import { PerGameStats, StatsTable } from '../../../../widgets/StatsTable';

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
  const [perGameStatsRegular, setPerGameStatsRegular] = useState<PerGameStats[] | null>(null);
  const { loading } = useQuery(GET_PLAYER_STATS, {
    fetchPolicy: 'network-only',
    variables: {
      key: playerKey,
    },
    onCompleted: (data: any) => {
      setPerGameStatsRegular(data.getPlayerStatsPerGame);
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
  const [stats, setStats] = useState<PerGameStats[] | null>(null);
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
  const [stats, setStats] = useState<PerGameStats[] | null>(null);
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
  const [stats, setStats] = useState<PerGameStats[] | null>(null);
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
