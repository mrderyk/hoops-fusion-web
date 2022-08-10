import { getAllPlayerKeys, getInitialPlayerData } from '../../lib/players';
import { PopupCharter } from '../../src/features/player/components/PopupCharter';
import { Header, HeaderProps } from '../../src/features/player/components/Header';
import { Highlights } from '../../src/features/player/components/Highlights';
import { Nav } from '../../src/features/player/components/Nav';
import { Stats } from '../../src/features/player/components/Stats';
import { Trends } from '../../src/features/player/components/Trends';
import { PageWrapper } from '../../src/shared-components/PageWrapper';

export default function Player({ initialData }: {initialData: HeaderProps}) {
  return (
    <PageWrapper>
      <Header
        {...initialData}
      />
      <Nav />
      <Stats playerKey={initialData.key} />
      <Trends playerKey={initialData.key} />
      <Highlights playerKey={initialData.key} />
      <PopupCharter />
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPlayerKeys();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params } : { params: any }) {
  const initialData = await getInitialPlayerData(params.key);
  return {
    props: {
      initialData,
    },
  };
}