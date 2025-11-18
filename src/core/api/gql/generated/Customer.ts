import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchCustomersDocument = gql`
    query FetchCustomers($body: FetchCustomersRq!) {
  fetchCustomers(body: $body) {
    count
    items {
      token
      first_name
      last_name
      mobile
      national_code
      description
      apb
      created_at
    }
  }
}
    `;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($body: CreateCustomerRq!) {
  createCustomer(body: $body)
}
    `;
export const EditCustomerDocument = gql`
    mutation EditCustomer($body: EditCustomerRq!) {
  editCustomer(body: $body)
}
    `;
export const ToggleCustomerApbDocument = gql`
    mutation ToggleCustomerApb($body: ToggleCustomerApbRq!) {
  toggleCustomerApb(body: $body)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchCustomers(variables: Types.FetchCustomersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchCustomersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchCustomersQuery>(FetchCustomersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchCustomers', 'query');
    },
    CreateCustomer(variables: Types.CreateCustomerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateCustomerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateCustomerMutation>(CreateCustomerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateCustomer', 'mutation');
    },
    EditCustomer(variables: Types.EditCustomerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditCustomerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditCustomerMutation>(EditCustomerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditCustomer', 'mutation');
    },
    ToggleCustomerApb(variables: Types.ToggleCustomerApbMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ToggleCustomerApbMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ToggleCustomerApbMutation>(ToggleCustomerApbDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ToggleCustomerApb', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;