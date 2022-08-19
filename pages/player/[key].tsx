import { PageWrapper } from 'shared-components/PageWrapper';
import { PrimaryContent, SecondaryContent, Wrapper } from 'page-components/player/styled';
import { PopupCharter } from 'page-components/player/PopupCharter';
import { Header, HeaderProps } from 'page-components/player/Header';
import { Nav, SubNav } from 'shared-components/Nav'
import { Stats } from 'page-components/player/Stats';
import { Trends } from 'page-components/player/Trends';
import { Socials } from 'page-components/player/Socials';
import { apolloClient } from 'lib/apollo-client';
import { gql } from '@apollo/client';

interface PlayerPageProps extends HeaderProps {
  twitter: string;
  instagram: string;
  socials: {
    youtubeVideoIds: string[];
    sneakerTokens: string[];
  }
}

const navLinks = [
  {
    text: 'LEAGUE LEADERS',
    href: '/league-leaders',
  }, {
    text: 'PLAYER DIRECTORY',
    href: '/players/a',
  }, {
    text: 'STAT CHARTER',
    href: '/stat-charter',
  }, 
];

export default function Player({ initialData }: {initialData: PlayerPageProps}) {
  const hasSocials = !!initialData.twitter ||
    !!initialData.instagram ||
    !!initialData.socials.youtubeVideoIds?.length;

  let subNavLinks = [
    {
      href: '#stats',
      text: 'CAREER STATS',
    },
    {
      href: '#trends',
      text: 'CAREER TRENDS',
    }
  ];

  if (hasSocials) {
    subNavLinks.push({
      href: '#social',
      text: 'SOCIAL',
    });
  }

  return (
    <PageWrapper>
      <Header
        {...initialData}
      />
      <Nav links={navLinks}/>
      <SubNav links={subNavLinks} />
      <Wrapper>
        <PrimaryContent>
          <Stats playerKey={initialData.key} />
          <Trends playerKey={initialData.key} />
        </PrimaryContent>
        {
          hasSocials &&
          <SecondaryContent>
            <Socials
              playerKey={initialData.key}
              twitter={initialData.twitter}
              sneakerTokens={initialData.socials.sneakerTokens}
            />
          </SecondaryContent>
        }
        
      </Wrapper>
      <PopupCharter />
    </PageWrapper>
  );
}

const getAllPlayerKeys = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query Query {
        getAllPlayerKeys {
          key
        }
      }
    `
  });
  
  const keys = data.getAllPlayerKeys.map((playerKeyEntry: any) => playerKeyEntry.key);

  return keys.map((key: string) => {
    return {
      params: { key },
    };
  });
}

// TODO: Lazy load socials
const getInitialPlayerData = async (key: string) => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetInitialPlayerData {
        getPlayer(key: "${key}") {
          key
          firstName
          lastName
          imgUrl
          number
          position
          fullName
          birthCity
          birthState
          birthCountry
          dob,
          height
          weight
          team
          draftYear
          twitter
          instagram
        }

        getPlayerSocials(key: "${key}") {
          youtubeVideoIds
          sneakerTokens
        }
      }
    `
  });

  return {
    key,
    ...data.getPlayer[0],
    socials: {
      ...data.getPlayerSocials[0],
    },
    
  };
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
