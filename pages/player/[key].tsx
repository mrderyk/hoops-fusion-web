import { getAllPlayerKeys, getInitialPlayerData } from './queries';
import { PageWrapper } from 'shared-components/PageWrapper';
import { PrimaryContent, SecondaryContent, Wrapper } from 'page-components/player/styled';
import { PopupCharter } from 'page-components/player/PopupCharter';
import { Header, HeaderProps } from 'page-components/player/Header';
import { Nav } from 'page-components/player/Nav';
import { Stats } from 'page-components/player/Stats';
import { Trends } from 'page-components/player/Trends';
import { Socials } from 'page-components/player/Socials';

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