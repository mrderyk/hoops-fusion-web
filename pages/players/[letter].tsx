import { gql } from '@apollo/client';
import { apolloClient } from '../../lib/apollo-client';
import { Link as NavLinkProps, SubNav } from 'src/shared-components/Nav';
import { Directory } from '../../src/page-components/players/Directory';
import { Letter } from '../../src/page-components/players/styled';
import { MainTitle } from 'shared-components/MainTitle';
import { Page, Section } from 'shared-components/Page';

const LETTERS = [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x',
  'y', 'z'
];

interface DirectoryData {
  first_name: string;
  last_name: string;
  key: string;
  img_url: string;
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

export default function Players({ letter, initialData }: {letter: string, initialData: {[key: string]: DirectoryData}}) {
  const letterLinks: NavLinkProps[] = LETTERS.map((letter: string) => ({
    href: `/players/${letter}`,
    text: `${letter.toUpperCase()}`
  }));

  const directoryEntries = Object.values(initialData).map((data: DirectoryData) => ({
    firstName: data.first_name,
    lastName: data.last_name,
    key: data.key,
    imgUrl: data.img_url,
  }))

  const headerContent = (
    <>
      <MainTitle>PLAYERS:</MainTitle>
      <Letter>{letter.toUpperCase()}</Letter>
    </>
  );

  return (
    <Page headerContent={headerContent}>
      <SubNav links={letterLinks} />
      <Section>
        <Directory entries={directoryEntries} />
      </Section>
    </Page>
  )
}

export async function getStaticPaths() {
  const paths = LETTERS.map((letter: string) => ({
    params: { letter },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params } : { params: any }) {
  const initialData = await getDirectoryData(params.letter);

  return {
    props: {
      letter: params.letter,
      initialData,
    },
  };
}

export const getDirectoryData = async (letter: string) => {
  const { data } = await apolloClient.query({
    query: gql`
      query Query {
        getPlayersByLetter(startsWith: "${letter}") {
          key
          first_name
          last_name
          img_url
        }
      }
    `
  });

  return {
    ...data.getPlayersByLetter,
  };
};
