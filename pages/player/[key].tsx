import { getAllPlayerKeys, getInitialPlayerData } from './queries';
import { PageWrapper } from 'shared-components/PageWrapper';
import { PrimaryContent, SecondaryContent, Wrapper } from 'page-components/player/styled';
import { PopupCharter } from 'page-components/player/PopupCharter';
import { Header, HeaderProps } from 'page-components/player/Header';
import { Nav, SubNav } from 'shared-components/Nav'
import { Stats } from 'page-components/player/Stats';
import { Trends } from 'page-components/player/Trends';
import { Socials } from 'page-components/player/Socials';
import { Sneakers } from 'widgets/Sneakers';
import { initial } from 'lodash';

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
    !!initialData.socials.youtubeVideoIds.length;

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

export async function getStaticPaths() {
  const paths = await getAllPlayerKeys();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params } : { params: any }) {
  const initialData = await getInitialPlayerData(params.key);
  console.log('init', initialData)
  return {
    props: {
      initialData,
    },
  };
}