import { ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    uri:'/graph',
    cache: new InMemoryCache(),
    headers:{
        "accept": "application/json, multipart/mixed"
    }
});

export default client;