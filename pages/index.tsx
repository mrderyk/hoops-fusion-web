import type { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import { BoxLogo } from 'page-components/home/BoxLogo';
import { Header } from 'shared-components/Header';
import { Nav } from 'shared-components/Nav';
import { PageContentWrapper } from 'shared-components/PageContentWrapper';
import { PageWrapper } from 'shared-components/PageWrapper';
import { DashboardContent } from './dashboard';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);

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
