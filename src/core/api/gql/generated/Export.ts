import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const ExportReportTrafficListDocument = gql`
    mutation ExportReportTrafficList($body: ReportTrafficListRq!) {
  exportReportTrafficList(body: $body) {
    data
    format
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ExportReportTrafficList(variables: Types.ExportReportTrafficListMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ExportReportTrafficListMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ExportReportTrafficListMutation>(ExportReportTrafficListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ExportReportTrafficList', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;