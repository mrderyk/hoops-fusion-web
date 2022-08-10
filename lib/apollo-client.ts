import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache()
});