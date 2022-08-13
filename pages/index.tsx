import type { NextPage } from 'next'
import { Home as Content } from '../src/features/home';
import { BoxLogo } from '../src/features/home/components/BoxLogo';
import { Header } from '../src/shared-components/Header';
import { Link, Nav, NavConfig } from '../src/shared-components/Nav';
import { SearchWrapper } from '../src/shared-components/Nav/styled';
import { PageWrapper } from '../src/shared-components/PageWrapper';
import { Search } from '../src/widgets/Search';
import { SearchInnerWrapper } from './players/components/styled';

const Home: NextPage = () => {
  const links = [
    {
      text: 'PLAYER DIRECTORY',
      href: '/players',
    }, {
      text: 'STAT CHARTER',
      href: '/stat-charter',
    }, 
  ];

  return (
    <PageWrapper>
      <Header>
        <BoxLogo />
      </Header>
      <Nav
        links={links}
        extras={[
          <SearchWrapper>
            <SearchInnerWrapper>
              <Search size={'12px'} />
            </SearchInnerWrapper>
          </SearchWrapper>
        ]}
      />
    </PageWrapper>
  );
}

export default Home
