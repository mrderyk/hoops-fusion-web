import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUri = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : 'https://hoops-fusion-api.herokuapp.com/api';
export const apolloClient = new ApolloClient({
  uri: apiUri,
  cache: new InMemoryCache()
});