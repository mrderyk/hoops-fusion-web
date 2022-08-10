import { gql } from '@apollo/client';
import { apolloClient } from '../../lib/apollo-client';
import { PageWrapper } from '../../src/shared-components/PageWrapper';

export default function Players({ initialData }: {initialData: any}) {
  return (
    <PageWrapper>
      Players
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const paths = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params } : { params: any }) {
  const initialData = await getDirectoryData(params.letter);
  console.log(initialData);
  return {
    props: {
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
        }
      }
    `
  });
};
