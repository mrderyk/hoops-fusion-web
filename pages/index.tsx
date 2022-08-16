import type { NextPage } from 'next'
import { BoxLogo } from 'page-components/home/BoxLogo';
import { Header } from 'shared-components/Header';
import { Nav } from 'shared-components/Nav';
import { SearchWrapper } from 'shared-components/Nav/styled';
import { PageContentWrapper } from 'shared-components/PageContentWrapper';
import { PageWrapper } from 'shared-components/PageWrapper';
import { Search } from 'widgets/Search';
import { Leaderboards } from 'page-components/home/Leaderboards';
import { SearchInnerWrapper } from './players/components/styled';

const Home: NextPage = () => {
  const links = [
    {
      text: 'PLAYER DIRECTORY',
      href: '/players',
    }, {
      text: 'STAT CHARTER',
      href: '/stat-charter',
    }, {
      text: 'DASHBOARD',
      href: '/dashboard'
    }
  ];

  return (
    <PageWrapper>
      <Header>
        <BoxLogo />
      </Header>
      <Nav links={links} />
      <PageContentWrapper>
          <Leaderboards />
      </PageContentWrapper>
    </PageWrapper>
  );
}

export default Home
