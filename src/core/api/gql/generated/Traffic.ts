import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchClientLast10TrafficsDocument = gql`
    query FetchClientLast10Traffics($body: FetchClientLast10TrafficsRq!) {
  fetchClientLast10Traffics(body: $body) {
    token
    plate_serial
    tag_serial
    card_serial
    plate_image
    driver_image
    description
    authorized
    client {
      token
      type
      name
    }
    customer {
      token
      first_name
      last_name
      apb
      blocked
      image_url
      access {
        token
        title
        client {
          token
          name
          type
        }
      }
    }
    created_at
  }
}
    `;
export const ClientLast10TrafficsSubDocument = gql`
    subscription ClientLast10TrafficsSub($token: String!) {
  clientLast10TrafficsSub(token: $token) {
    token
    plate_serial
    tag_serial
    card_serial
    plate_image
    driver_image
    description
    authorized
    client {
      token
      type
      name
    }
    customer {
      token
      first_name
      last_name
      apb
      blocked
      image_url
      access {
        token
        title
        client {
          token
          name
          type
        }
      }
    }
    created_at
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchClientLast10Traffics(variables: Types.FetchClientLast10TrafficsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchClientLast10TrafficsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchClientLast10TrafficsQuery>(FetchClientLast10TrafficsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchClientLast10Traffics', 'query');
    },
    ClientLast10TrafficsSub(variables: Types.ClientLast10TrafficsSubSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.ClientLast10TrafficsSubSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ClientLast10TrafficsSubSubscription>(ClientLast10TrafficsSubDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ClientLast10TrafficsSub', 'subscription');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;