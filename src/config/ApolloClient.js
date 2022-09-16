import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
});