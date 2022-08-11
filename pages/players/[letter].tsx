import { gql } from '@apollo/client';
import { apolloClient } from '../../lib/apollo-client';
import { Header } from '../../src/shared-components/Header';
import { Link as NavLinkProps, Nav } from '../../src/shared-components/Nav';
import { PageWrapper } from '../../src/shared-components/PageWrapper';
import { Search } from '../../src/shared-components/Search';
import { SectionWrapper } from '../../src/shared-components/SectionWrapper';
import { Directory } from './components/Directory';
import { Letter, MainTitle, SearchInnerWrapper, SearchWrapper } from './components/styled';

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

export default function Players({ letter, initialData }: {letter: string, initialData: {[key: string]: DirectoryData}}) {
  const navLinks: NavLinkProps[] = LETTERS.map((letter: string) => ({
    href: `/players/${letter}`,
    text: `${letter.toUpperCase()}`
  }));

  const directoryEntries = Object.values(initialData).map((data: DirectoryData) => ({
    firstName: data.first_name,
    lastName: data.last_name,
    key: data.key,
    imgUrl: data.img_url,
  }))
  
  return (
    <PageWrapper>
      <Header>
        <MainTitle>PLAYERS:</MainTitle>
        <Letter>{letter.toUpperCase()}</Letter>
      </Header>
      <Nav
        links={navLinks}
        extras={[
          <SearchWrapper>
            <SearchInnerWrapper>
              <Search size={'12px'} />
            </SearchInnerWrapper>
          </SearchWrapper>
        ]}
      />
      <SectionWrapper>
        <Directory entries={directoryEntries} />
      </SectionWrapper>
    </PageWrapper>
  );
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
