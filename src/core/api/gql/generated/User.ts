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
    is_active
    profile_image
    expiration_date
    role {
      token
      name
      is_default
      permissions {
        link
      }
    }
  }
}
    `;
export const UserLoginDocument = gql`
    mutation UserLogin($body: UserLoginRq!) {
  userLogin(body: $body)
}
    `;
export const FetchUsersListDocument = gql`
    query FetchUsersList($body: FetchUsersListRq!) {
  fetchUsersList(body: $body) {
    count
    items {
      token
      username
      fullname
      is_active
      profile_image
      expiration_date
      role {
        token
        name
        is_default
        permissions {
          link
        }
      }
    }
  }
}
    `;
export const ToggleUserStatusDocument = gql`
    mutation ToggleUserStatus($body: ToggleUserStatus!) {
  toggleUserStatus(body: $body)
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($body: CreateUserRq!) {
  createUser(body: $body)
}
    `;
export const EditUserDocument = gql`
    mutation EditUser($body: EditUserRq!) {
  editUser(body: $body)
}
    `;
export const SearchUsersByFullnameDocument = gql`
    query SearchUsersByFullname($body: SearchUsersByFullnameRq!) {
  searchUsersByFullname(body: $body) {
    token
    username
    fullname
  }
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
    },
    FetchUsersList(variables: Types.FetchUsersListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchUsersListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchUsersListQuery>(FetchUsersListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchUsersList', 'query');
    },
    ToggleUserStatus(variables: Types.ToggleUserStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ToggleUserStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ToggleUserStatusMutation>(ToggleUserStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ToggleUserStatus', 'mutation');
    },
    CreateUser(variables: Types.CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    EditUser(variables: Types.EditUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditUserMutation>(EditUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditUser', 'mutation');
    },
    SearchUsersByFullname(variables: Types.SearchUsersByFullnameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.SearchUsersByFullnameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.SearchUsersByFullnameQuery>(SearchUsersByFullnameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SearchUsersByFullname', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;