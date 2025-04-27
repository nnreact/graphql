import React from 'react'
import Users from './Users'
import CreateUser from './CreateUser'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                {/* <Users /> */}
                <CreateUser />
            </div>
        </ApolloProvider>
    )
}

export default App
