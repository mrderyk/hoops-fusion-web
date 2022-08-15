import { NextPage } from 'next';
import { Header } from '../../src/shared-components/Header';
import { Title } from '../../src/shared-components/Header/styled';
import { Nav } from '../../src/shared-components/Nav';
import { SearchWrapper } from '../../src/shared-components/Nav/styled';
import { PageContentWrapper } from '../../src/shared-components/PageContentWrapper';
import { PageWrapper } from '../../src/shared-components/PageWrapper';
import { Search } from '../../src/widgets/Search';
import { SearchInnerWrapper } from '../players/components/styled';
import { StatCharter as StatCharterWidget } from '../../src/widgets/StatCharter';


const StatCharter: NextPage = () => {
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
        <Title>STAT CHARTER</Title>
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
      <PageContentWrapper>
        <StatCharterWidget />
      </PageContentWrapper>
    </PageWrapper>
  );
}

export default StatCharter
