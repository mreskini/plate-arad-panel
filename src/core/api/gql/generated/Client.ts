import * as Types from './operations';

import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export const FetchClientsDocument = gql`
    query FetchClients {
  fetchClients {
    token
    name
    type
    camera {
      token
      name
      ip
      type
      username
      password
      brand_name
      channel
    }
    relay {
      token
      name
      ip
      type
      username
      password
      brand_name
      channel
    }
    reader {
      token
      name
      ip
      type
      username
      password
      brand_name
      channel
    }
  }
}
    `;
export const FetchFlatClientsDocument = gql`
    query FetchFlatClients {
  fetchClients {
    token
    name
    type
  }
}
    `;
export const CreateClientDocument = gql`
    mutation CreateClient($body: CreateClientRq!) {
  createClient(body: $body)
}
    `;
export const EditClientDocument = gql`
    mutation EditClient($body: EditClientRq!) {
  editClient(body: $body)
}
    `;
export const DeleteClientDocument = gql`
    mutation DeleteClient($body: DeleteClientRq!) {
  deleteClient(body: $body)
}
    `;
export const FetchSchedulesDocument = gql`
    query FetchSchedules {
  fetchSchedules {
    token
    title
    start_date
    end_date
    start_time
    end_time
    allowed_days
  }
}
    `;
export const FetchFlatSchedulesDocument = gql`
    query FetchFlatSchedules {
  fetchSchedules {
    token
    title
  }
}
    `;
export const CreateScheduleDocument = gql`
    mutation CreateSchedule($body: CreateScheduleRq!) {
  createSchedule(body: $body)
}
    `;
export const EditScheduleDocument = gql`
    mutation EditSchedule($body: EditScheduleRq!) {
  editSchedule(body: $body)
}
    `;
export const CreateAccessControlDocument = gql`
    mutation CreateAccessControl($body: CreateAccessControlRq!) {
  createAccessControl(body: $body)
}
    `;
export const EditAccessControlDocument = gql`
    mutation EditAccessControl($body: EditAccessControlRq!) {
  editAccessControl(body: $body)
}
    `;
export const FetchAccessControlsDocument = gql`
    query FetchAccessControls {
  fetchAccessControls {
    token
    title
    client {
      token
      name
      type
      camera {
        token
        name
        ip
        type
        username
        password
        brand_name
        channel
      }
      relay {
        token
        name
        ip
        type
        username
        password
        brand_name
        channel
      }
    }
    schedule {
      token
      title
      start_date
      end_date
      start_time
      end_time
    }
  }
}
    `;
export const FetchFlatAccessControlsDocument = gql`
    query FetchFlatAccessControls {
  fetchAccessControls {
    token
    title
    schedule {
      title
    }
  }
}
    `;
export const OpenClientGateDocument = gql`
    mutation OpenClientGate($body: OpenClientGateRq!) {
  openClientGate(body: $body)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    FetchClients(variables?: Types.FetchClientsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchClientsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchClientsQuery>(FetchClientsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchClients', 'query');
    },
    FetchFlatClients(variables?: Types.FetchFlatClientsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchFlatClientsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchFlatClientsQuery>(FetchFlatClientsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchFlatClients', 'query');
    },
    CreateClient(variables: Types.CreateClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateClientMutation>(CreateClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateClient', 'mutation');
    },
    EditClient(variables: Types.EditClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditClientMutation>(EditClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditClient', 'mutation');
    },
    DeleteClient(variables: Types.DeleteClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.DeleteClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteClientMutation>(DeleteClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteClient', 'mutation');
    },
    FetchSchedules(variables?: Types.FetchSchedulesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchSchedulesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchSchedulesQuery>(FetchSchedulesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchSchedules', 'query');
    },
    FetchFlatSchedules(variables?: Types.FetchFlatSchedulesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchFlatSchedulesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchFlatSchedulesQuery>(FetchFlatSchedulesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchFlatSchedules', 'query');
    },
    CreateSchedule(variables: Types.CreateScheduleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateScheduleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateScheduleMutation>(CreateScheduleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateSchedule', 'mutation');
    },
    EditSchedule(variables: Types.EditScheduleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditScheduleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditScheduleMutation>(EditScheduleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditSchedule', 'mutation');
    },
    CreateAccessControl(variables: Types.CreateAccessControlMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.CreateAccessControlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateAccessControlMutation>(CreateAccessControlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAccessControl', 'mutation');
    },
    EditAccessControl(variables: Types.EditAccessControlMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.EditAccessControlMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditAccessControlMutation>(EditAccessControlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditAccessControl', 'mutation');
    },
    FetchAccessControls(variables?: Types.FetchAccessControlsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchAccessControlsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchAccessControlsQuery>(FetchAccessControlsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchAccessControls', 'query');
    },
    FetchFlatAccessControls(variables?: Types.FetchFlatAccessControlsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchFlatAccessControlsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchFlatAccessControlsQuery>(FetchFlatAccessControlsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FetchFlatAccessControls', 'query');
    },
    OpenClientGate(variables: Types.OpenClientGateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.OpenClientGateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.OpenClientGateMutation>(OpenClientGateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OpenClientGate', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;