import { getAllPlayerKeys, getInitialPlayerData } from '../../lib/players';
import { PopupCharter } from '../../src/features/player/components/PopupCharter';
import { Header, HeaderProps } from '../../src/features/player/components/Header';
import { Highlights } from '../../src/features/player/components/Highlights';
import { Nav } from '../../src/features/player/components/Nav';
import { Stats } from '../../src/features/player/components/Stats';
import { Trends } from '../../src/features/player/components/Trends';
import { PageWrapper } from '../../src/shared-components/PageWrapper';
import { Twitter } from '../../src/widgets/Socials/Twitter';
import { PrimaryContent, SecondaryContent, Wrapper } from './components/styled';
import { Socials } from '../../src/widgets/Socials';

interface PlayerPageProps extends HeaderProps {
  twitter: string;
  instagram: string;
}

export default function Player({ initialData }: {initialData: PlayerPageProps}) {
  return (
    <PageWrapper>
      <Header
        {...initialData}
      />
      <Nav />
      <Wrapper>
        <PrimaryContent>
          <Stats playerKey={initialData.key} />
          <Trends playerKey={initialData.key} />
        </PrimaryContent>
        <SecondaryContent>
          {
            (!!initialData.twitter || !!initialData.instagram ) &&
              <Socials playerKey={initialData.key} twitter={initialData.twitter} instagram={initialData.instagram} />
          }
        </SecondaryContent>
      </Wrapper>
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