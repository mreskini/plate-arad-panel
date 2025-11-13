import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchIdentifiersDocument = gql`
    query FetchIdentifiers($body: FetchIdentifiersRq!) {
  fetchIdentifiers(body: $body) {
    count
    items {
      token
      serial
      number
      type
      available
    }
  }
}
    `;
export const CreateIdentifierDocument = gql`
    mutation CreateIdentifier($body: CreateIdentifierRq!) {
  createIdentifier(body: $body)
}
    `;
export const EditIdentifierDocument = gql`
    mutation EditIdentifier($body: EditIdentifierRq!) {
  editIdentifier(body: $body)
}
    `;
export const ToggleIdentifierStatusDocument = gql`
    mutation ToggleIdentifierStatus($body: ToggleIdentifierStatusRq!) {
  toggleIdentifierStatus(body: $body)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchIdentifiers(variables: Types.FetchIdentifiersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchIdentifiersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchIdentifiersQuery>(FetchIdentifiersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchIdentifiers', 'query');
    },
    CreateIdentifier(variables: Types.CreateIdentifierMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateIdentifierMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateIdentifierMutation>(CreateIdentifierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateIdentifier', 'mutation');
    },
    EditIdentifier(variables: Types.EditIdentifierMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditIdentifierMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditIdentifierMutation>(EditIdentifierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditIdentifier', 'mutation');
    },
    ToggleIdentifierStatus(variables: Types.ToggleIdentifierStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ToggleIdentifierStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ToggleIdentifierStatusMutation>(ToggleIdentifierStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ToggleIdentifierStatus', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;