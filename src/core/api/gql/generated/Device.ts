import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchDevicesDocument = gql`
    query FetchDevices {
  fetchDevices {
    token
    type
    ip
    name
    brand_name
    username
    password
    channel
  }
}
    `;
export const CreateDeviceDocument = gql`
    mutation CreateDevice($body: CreateDeviceRq!) {
  createDevice(body: $body)
}
    `;
export const EditDeviceDocument = gql`
    mutation EditDevice($body: EditDeviceRq!) {
  editDevice(body: $body)
}
    `;
export const PingAllDevicesDocument = gql`
    query PingAllDevices {
  pingAllDevices {
    name
    ip
    type
    is_alive
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchDevices(variables?: Types.FetchDevicesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchDevicesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchDevicesQuery>(FetchDevicesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchDevices', 'query');
    },
    CreateDevice(variables: Types.CreateDeviceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateDeviceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateDeviceMutation>(CreateDeviceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateDevice', 'mutation');
    },
    EditDevice(variables: Types.EditDeviceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditDeviceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditDeviceMutation>(EditDeviceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditDevice', 'mutation');
    },
    PingAllDevices(variables?: Types.PingAllDevicesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.PingAllDevicesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.PingAllDevicesQuery>(PingAllDevicesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PingAllDevices', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;