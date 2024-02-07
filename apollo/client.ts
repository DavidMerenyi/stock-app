import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://baliangao.stepzen.net/api/ardent-otter/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Apikey baliangao::stepzen.net+1000::e8acd05412d0b53af477699a6ed563175887a1d12bd63e153cb6339cf008cc9e'
    }
});

export default client