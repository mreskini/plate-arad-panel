import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const ParkingInfoDocument = gql`
    query ParkingInfo {
  parkingInfo {
    name
    server_uuid
    clients_count
    license
    uhf
    csn
    plate_recognition
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ParkingInfo(variables?: Types.ParkingInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ParkingInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ParkingInfoQuery>(ParkingInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ParkingInfo', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;