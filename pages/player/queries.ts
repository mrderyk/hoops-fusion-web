import { gql } from '@apollo/client';
import { apolloClient } from '../../lib/apollo-client';

export const getAllPlayerKeys = async () => {
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

export const getInitialPlayerData = async (key: string) => {
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
      }
    `
  });

  return {
    key,
    ...data.getPlayer[0],
  };
}
