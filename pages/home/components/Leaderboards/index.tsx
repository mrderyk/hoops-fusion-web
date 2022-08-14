import { SectionHeader, SectionSubheader } from "../../../../src/features/player/styled";
import { SectionInnerWrapper, SectionWrapper } from "../../../../src/shared-components/SectionWrapper";
import { Leaderboard } from "../../../../src/widgets/Leaderboard";
import { LeaderboardsWrapper, LeaderboardWrapper, Wrapper } from "./styled";

export const Leaderboards = () => {
  return (
    <Wrapper>
      <SectionWrapper>
        <SectionHeader>LEAGUE LEADERS</SectionHeader>
        <SectionInnerWrapper>
          <SectionSubheader>REGULAR SEASON</SectionSubheader>
          <LeaderboardsWrapper>
          {
            Object.keys(STAT_TO_LEADERS_TITLE).map((stat: string) => (
                <LeaderboardWrapper>
                  <Leaderboard title={STAT_TO_LEADERS_TITLE[stat]} stat={stat} period={'regular'} />
                </LeaderboardWrapper>
            ))
          }
          </LeaderboardsWrapper>
          <SectionSubheader>PLAYOFFS</SectionSubheader>
          <LeaderboardsWrapper>
          {
            Object.keys(STAT_TO_LEADERS_TITLE).map((stat: string) => (
                <LeaderboardWrapper>
                  <Leaderboard title={STAT_TO_LEADERS_TITLE[stat]} stat={stat} period={'playoffs'} />
                </LeaderboardWrapper>
            ))
          }
          </LeaderboardsWrapper>
        </SectionInnerWrapper>
      </SectionWrapper>
    </Wrapper>
  );
};

const STAT_TO_LEADERS_TITLE: {[key: string]: string} = {
  pts: 'Points Per Game',
  ast: 'Assists Per Game',
  reb: 'Rebounds Per Game',
  stl: 'Steals Per Game',
  blk: 'Blocks Per Game',
  fg3m: '3-Pointers Made Per Game',
  ftm: 'Free Throws Made Per Game',
  fgpct: 'Field Goal %',
  fg2pct: '2-Point Field Goal %',
  fg3pct: '3-Point Field Goal %',
  ftpct: 'Free Throw %',
};
