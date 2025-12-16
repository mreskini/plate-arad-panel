import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"

const httpLink = new HttpLink({ uri: `${import.meta.env.VITE_PUBLIC_BASE_API_URL}/graphql` })
const wsLink = new GraphQLWsLink(
    createClient({ url: import.meta.env.VITE_PUBLIC_WS_URL, retryAttempts: 5, shouldRetry: () => true })
)

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    httpLink
)

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
})
