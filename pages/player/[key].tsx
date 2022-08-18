import { getAllPlayerKeys, getInitialPlayerData } from './queries';
import { PageWrapper } from 'shared-components/PageWrapper';
import { PrimaryContent, SecondaryContent, Wrapper } from 'page-components/player/styled';
import { PopupCharter } from 'page-components/player/PopupCharter';
import { Header, HeaderProps } from 'page-components/player/Header';
import { Nav } from 'page-components/player/Nav';
import { Stats } from 'page-components/player/Stats';
import { Trends } from 'page-components/player/Trends';
import { Socials } from 'page-components/player/Socials';
import { Sneakers } from 'widgets/Sneakers';

interface PlayerPageProps extends HeaderProps {
  twitter: string;
  instagram: string;
  socials: {
    youtubeVideoIds: string[];
  }
}

export default function Player({ initialData }: {initialData: PlayerPageProps}) {
  const hasSocials = !!initialData.twitter ||
    !!initialData.instagram ||
    !!initialData.socials.youtubeVideoIds.length;

  return (
    <PageWrapper>
      <Header
        {...initialData}
      />
      <Nav hasSocials={hasSocials} />
      <Wrapper>
        <PrimaryContent>
          <Stats playerKey={initialData.key} />
          <Trends playerKey={initialData.key} />
        </PrimaryContent>
        {
          hasSocials &&
          <SecondaryContent>
           <Socials playerKey={initialData.key} />
          </SecondaryContent>
        }
        
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