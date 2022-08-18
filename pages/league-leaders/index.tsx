import type { NextPage } from 'next'
import { Leaderboards } from 'page-components/home/Leaderboards';
import { Page } from 'shared-components/Page';
import { MainTitle } from 'shared-components/MainTitle';

const Home: NextPage = () => {
  return (
    <Page headerContent={<MainTitle>LEAGUE LEADERS</MainTitle>}>
      <Leaderboards />
    </Page>
  )
}

export default Home