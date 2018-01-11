import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-client-preset'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

//For authentification
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(
    {
      headers: { authorization: `Bearer ${localStorage.getItem('userToken')}`,
      }
    }
  )
  return forward(operation);
})

const httpLink = new HttpLink({
  // Should use an absolute URL here
  uri: 'https://api.graph.cool/simple/v1/cjb6gsrro1a4n0181jb30j9sj',
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo)

//Apollo
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
