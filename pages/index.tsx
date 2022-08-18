import type { NextPage } from 'next'
import { BoxLogo } from 'page-components/home/BoxLogo';
import { Header } from 'shared-components/Header';
import { Nav } from 'shared-components/Nav';
import { PageContentWrapper } from 'shared-components/PageContentWrapper';
import { PageWrapper } from 'shared-components/PageWrapper';
import { Leaderboards } from 'page-components/home/Leaderboards';
import { Page, Section } from 'shared-components/Page';
import { MainTitle } from 'shared-components/MainTitle';
import { WidgetMaker } from 'page-components/dashboard/WidgetMaker';
import { Plock } from 'react-plock';
import { DashboardContent } from './dashboard';

const Home: NextPage = () => {
  const links = [
    {
      text: 'LEAGUE LEADERS',
      href: '/league-leaders',
    },
    {
      text: 'PLAYER DIRECTORY',
      href: '/players/a',
    }, {
      text: 'STAT CHARTER',
      href: '/stat-charter',
    }
  ];

  return (
    <PageWrapper>
      <Header>
        <BoxLogo />
      </Header>
      <Nav links={links} />
      <PageContentWrapper>
          <DashboardContent />
      </PageContentWrapper>
    </PageWrapper>
  );
}

export default Home
