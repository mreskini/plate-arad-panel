// src/lib/apollo-client.js
import { ApolloClient, gql, HttpLink, InMemoryCache, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { useSubscription } from "@apollo/client/react"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"

// Your server configuration
const SERVER_URL = "192.168.20.87"
const GRAPHQL_ENDPOINT = "/api/graphql"

// HTTP link for queries and mutations
const httpLink = new HttpLink({
    uri: `http://${SERVER_URL}${GRAPHQL_ENDPOINT}`,
})

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
    createClient({
        url: `ws://${SERVER_URL}${GRAPHQL_ENDPOINT}`,
        connectionParams: () => {
            // Add authentication token if needed
            const token = localStorage.getItem("authToken")
            return token ? { authorization: `Bearer ${token}` } : {}
        },
        // Optional: Add reconnection logic
        retryAttempts: 5,
        shouldRetry: () => true,
        on: {
            connected: () => console.log("WebSocket connected"),
            error: err => console.error("WebSocket error:", err),
        },
    })
)

// Split communication: WebSocket for subscriptions, HTTP for everything else
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    httpLink
)

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
        },
    },
})

export const TRAFFICS_SUBSCRIPTION = gql`
    subscription ($token: String!) {
        clientLast10TrafficsSub(token: $token) {
            token
            customer {
                first_name
            }
        }
    }
`

export const useTrafficSubscription = (options = {}) => {
    return useSubscription(TRAFFICS_SUBSCRIPTION, {
        onData: ({ data }) => {
            console.log("New traffic data received:", data)
        },
        onError: error => {
            console.error("Subscription error:", error)
        },
        ...options,
        variables: {
            token: "0d3a4158-301c-4930-af40-ea64184503f3",
        },
    })
}
