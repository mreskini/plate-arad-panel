import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    token
    username
    fullname
    role {
      token
      name
      permissions {
        link
      }
    }
    rate_limit
    profile_image
    manual_exit_monthly_limit
    manual_exit_daily_limit
    is_active
    expiration_date
  }
}
    `;
export const UserLoginDocument = gql`
    mutation UserLogin($body: UserLoginRq!) {
  userLogin(body: $body)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CurrentUser(variables?: Types.CurrentUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CurrentUserQuery>(CurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentUser', 'query');
    },
    UserLogin(variables: Types.UserLoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.UserLoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UserLoginMutation>(UserLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserLogin', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;