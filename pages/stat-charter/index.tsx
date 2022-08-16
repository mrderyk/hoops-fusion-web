import { NextPage } from 'next';
import { Header } from 'shared-components/Header';
import { Title } from 'shared-components/Header/styled';
import { Nav } from 'shared-components/Nav';
import { SearchWrapper } from 'shared-components/Nav/styled';
import { PageContentWrapper } from 'shared-components/PageContentWrapper';
import { PageWrapper } from 'shared-components/PageWrapper';
import { Search } from 'widgets/Search';
import { SearchInnerWrapper } from '../players/components/styled';
import { StatCharter as StatCharterWidget } from 'widgets/StatCharter';


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
      <Nav links={links} />
      <PageContentWrapper>
        <StatCharterWidget />
      </PageContentWrapper>
    </PageWrapper>
  );
}

export default StatCharter
