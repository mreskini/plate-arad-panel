import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const ReportTrafficListDocument = gql`
    query ReportTrafficList($body: ReportTrafficListRq!) {
  reportTrafficList(body: $body) {
    count
    items {
      client_name
      access_control_name
      plate_serial
      customer_name
      tag_serial
      card_serial
      created_at
      plate_image
      driver_image
      authorized
      type
      description
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ReportTrafficList(variables: Types.ReportTrafficListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ReportTrafficListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ReportTrafficListQuery>(ReportTrafficListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ReportTrafficList', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;