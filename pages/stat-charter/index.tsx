import { NextPage } from 'next';
import { StatCharter as StatCharterWidget } from 'widgets/StatCharter';
import { MainTitle } from 'shared-components/MainTitle';
import { Page } from 'shared-components/Page';
import { PageContentWrapper } from 'shared-components/PageContentWrapper';


const StatCharter: NextPage = () => {
  const headerContent = (
    <>
      <MainTitle>STAT CHARTER</MainTitle>
    </>
  );
  return (
    <Page headerContent={headerContent} >
      <PageContentWrapper>
        <StatCharterWidget />
      </PageContentWrapper>
    </Page>
  )
}

export default StatCharter
