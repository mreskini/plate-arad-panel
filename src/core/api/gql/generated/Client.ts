import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchClientsDocument = gql`
    query FetchClients {
  fetchClients {
    token
    name
    type
    camera {
      token
      name
      ip
      type
      username
      password
      brand_name
      channel
    }
    relay {
      token
      name
      ip
      type
      username
      password
      brand_name
      channel
    }
  }
}
    `;
export const CreateClientDocument = gql`
    mutation CreateClient($body: CreateClientRq!) {
  createClient(body: $body)
}
    `;
export const EditClientDocument = gql`
    mutation EditClient($body: EditClientRq!) {
  editClient(body: $body)
}
    `;
export const DeleteClientDocument = gql`
    mutation DeleteClient($body: DeleteClientRq!) {
  deleteClient(body: $body)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchClients(variables?: Types.FetchClientsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchClientsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchClientsQuery>(FetchClientsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchClients', 'query');
    },
    CreateClient(variables: Types.CreateClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateClientMutation>(CreateClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateClient', 'mutation');
    },
    EditClient(variables: Types.EditClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditClientMutation>(EditClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditClient', 'mutation');
    },
    DeleteClient(variables: Types.DeleteClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.DeleteClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteClientMutation>(DeleteClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteClient', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;