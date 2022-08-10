import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Background } from './styled';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hoops Fusion 0.1.0</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet"></link>
      </Head>
      <UserProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </UserProvider>
    </>
  )
}

export default MyApp
