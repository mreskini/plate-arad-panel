import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchRolesDocument = gql`
    query FetchRoles {
  fetchRoles {
    token
    name
    is_default
    permissions {
      link
    }
  }
}
    `;
export const FetchRoleByTokenDocument = gql`
    query FetchRoleByToken($body: FetchRoleByTokenRq!) {
  fetchRoleByToken(body: $body) {
    token
    name
    permissions {
      link
    }
    is_default
  }
}
    `;
export const CreateNewRoleDocument = gql`
    mutation CreateNewRole($body: CreateNewRoleRq!) {
  createNewRole(body: $body)
}
    `;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($body: UpdateRoleRq!) {
  updateRole(body: $body)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchRoles(variables?: Types.FetchRolesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchRolesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchRolesQuery>(FetchRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchRoles', 'query');
    },
    FetchRoleByToken(variables: Types.FetchRoleByTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchRoleByTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchRoleByTokenQuery>(FetchRoleByTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchRoleByToken', 'query');
    },
    CreateNewRole(variables: Types.CreateNewRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateNewRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateNewRoleMutation>(CreateNewRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateNewRole', 'mutation');
    },
    UpdateRole(variables: Types.UpdateRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.UpdateRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateRoleMutation>(UpdateRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateRole', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;