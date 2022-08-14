import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { PlayerImage } from "../../../pages/home/components/Leaderboards/styled";
import { StatsTable, Table } from "../Tables";
import { Wrapper } from "./styled";

interface LeaderboardProps {
  title: string;
  stat: string;
  period: 'regular' | 'playoffs';
}

interface Leader {
  firstName: string;
  lastName: string;
  imgUrl: string;
  key: string;
  stat: number;
}

interface DbLeader {
  first_name: string;
  last_name: string;
  img_url: string;
  key: string;
  stat: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ title, stat, period }) => {
  const [ leadersData, setLeadersData ] = useState<Leader[] | null>(null)
  const [ getLeagueLeaders, { loading }] = useLazyQuery(GET_LEAGUE_LEADERS, {
    fetchPolicy: 'cache-first',
    onCompleted: (data: any) => {
      setLeadersData(
        data.getLeagueLeaders.leaders.map((leader: DbLeader) => ({
          firstName: leader.first_name,
          lastName: leader.last_name,
          imgUrl: leader.img_url,
          key: leader.key,
          stat: leader.stat,
        }))
      )
    }
  });

  const runQuery = () => {
    getLeagueLeaders({
      variables: {
        period,
        statType: stat
      }
    });
  };

  useEffect(() => {
    runQuery();
  }, []);

  return (
    <Wrapper>
      {
        leadersData &&
        <Table
          title={title}
          headers={['', 'PLAYER', stat.toUpperCase()]}
          contents={
            leadersData.map((leaderData: Leader) => {
              return [
                <PlayerImage src={leaderData.imgUrl} />,
                `${leaderData.firstName} ${leaderData.lastName}`,
                `${leaderData.stat}`
              ];
            })
          }
          cellStyles={{
            fontWeight: 600,
          }}
        />
      }
    </Wrapper>
  );
};

const GET_LEAGUE_LEADERS = gql`
  query Query($period: String, $statType: String) {
    getLeagueLeaders(period: $period, statType: $statType) {
      leaders {
        key
        first_name
        last_name
        stat
        img_url
      }
      category
    }
  }
`;