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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchRoles(variables?: Types.FetchRolesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchRolesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchRolesQuery>(FetchRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchRoles', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;