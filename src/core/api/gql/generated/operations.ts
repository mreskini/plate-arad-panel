import * as Types from './schemas';

export type FetchClientsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchClientsQuery = { fetchClients: Array<{ token: string, name: string, type: Types.E_ClientType, camera?: { token: string, name: string, ip: string, type: Types.E_DeviceType, username?: string | null, password?: string | null, brand_name?: string | null, channel?: number | null } | null, relay?: { token: string, name: string, ip: string, type: Types.E_DeviceType, username?: string | null, password?: string | null, brand_name?: string | null, channel?: number | null } | null, reader?: { token: string, name: string, ip: string, type: Types.E_DeviceType, username?: string | null, password?: string | null, brand_name?: string | null, channel?: number | null } | null }> };

export type FetchFlatClientsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchFlatClientsQuery = { fetchClients: Array<{ token: string, name: string, type: Types.E_ClientType }> };

export type CreateClientMutationVariables = Types.Exact<{
  body: Types.CreateClientRq;
}>;


export type CreateClientMutation = { createClient: boolean };

export type EditClientMutationVariables = Types.Exact<{
  body: Types.EditClientRq;
}>;


export type EditClientMutation = { editClient: boolean };

export type DeleteClientMutationVariables = Types.Exact<{
  body: Types.DeleteClientRq;
}>;


export type DeleteClientMutation = { deleteClient: boolean };

export type FetchSchedulesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchSchedulesQuery = { fetchSchedules: Array<{ token: string, title: string, start_date: string, end_date?: string | null, start_time: string, end_time: string, allowed_days: Array<Types.E_DayOfWeek> }> };

export type FetchFlatSchedulesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchFlatSchedulesQuery = { fetchSchedules: Array<{ token: string, title: string }> };

export type CreateScheduleMutationVariables = Types.Exact<{
  body: Types.CreateScheduleRq;
}>;


export type CreateScheduleMutation = { createSchedule: boolean };

export type EditScheduleMutationVariables = Types.Exact<{
  body: Types.EditScheduleRq;
}>;


export type EditScheduleMutation = { editSchedule: boolean };

export type CreateAccessControlMutationVariables = Types.Exact<{
  body: Types.CreateAccessControlRq;
}>;


export type CreateAccessControlMutation = { createAccessControl: boolean };

export type EditAccessControlMutationVariables = Types.Exact<{
  body: Types.EditAccessControlRq;
}>;


export type EditAccessControlMutation = { editAccessControl: boolean };

export type FetchAccessControlsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchAccessControlsQuery = { fetchAccessControls: Array<{ token: string, title: string, client: { token: string, name: string, type: Types.E_ClientType, camera?: { token: string, name: string, ip: string, type: Types.E_DeviceType, username?: string | null, password?: string | null, brand_name?: string | null, channel?: number | null } | null, relay?: { token: string, name: string, ip: string, type: Types.E_DeviceType, username?: string | null, password?: string | null, brand_name?: string | null, channel?: number | null } | null }, schedule: { token: string, title: string, start_date: string, end_date?: string | null, start_time: string, end_time: string } }> };

export type FetchFlatAccessControlsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchFlatAccessControlsQuery = { fetchAccessControls: Array<{ token: string, title: string, schedule: { title: string } }> };

export type FetchCustomersQueryVariables = Types.Exact<{
  body: Types.FetchCustomersRq;
}>;


export type FetchCustomersQuery = { fetchCustomers: { count: number, items: Array<{ token: string, first_name: string, last_name: string, mobile: string, national_code: string, description?: string | null, apb: boolean, blocked: boolean, image_url?: string | null, created_at: any, vehicles: Array<{ token: string, plate_number: string, model?: string | null, color?: string | null, manufacture_year?: string | null, image_url?: string | null }>, access?: { token: string, title: string, schedule: { token: string, title: string, start_date: string, end_date?: string | null, start_time: string, end_time: string, allowed_days: Array<Types.E_DayOfWeek> } } | null, identifiers?: Array<{ token: string, serial: string, number: string, type: Types.E_IdentifierType, available: boolean, in_use: boolean }> | null }> } };

export type CreateCustomerMutationVariables = Types.Exact<{
  body: Types.CreateCustomerRq;
}>;


export type CreateCustomerMutation = { createCustomer: boolean };

export type EditCustomerMutationVariables = Types.Exact<{
  body: Types.EditCustomerRq;
}>;


export type EditCustomerMutation = { editCustomer: boolean };

export type ToggleCustomerApbMutationVariables = Types.Exact<{
  body: Types.ToggleCustomerApbRq;
}>;


export type ToggleCustomerApbMutation = { toggleCustomerApb: boolean };

export type ToggleCustomerBlockedMutationVariables = Types.Exact<{
  body: Types.ToggleCustomerBlockedRq;
}>;


export type ToggleCustomerBlockedMutation = { toggleCustomerBlocked: boolean };

export type AddIdentifierToCustomerMutationVariables = Types.Exact<{
  body: Types.AddIdentifierToCustomerRq;
}>;


export type AddIdentifierToCustomerMutation = { addIdentifierToCustomer: boolean };

export type CreateVehicleMutationVariables = Types.Exact<{
  body: Types.CreateVehicleRq;
}>;


export type CreateVehicleMutation = { createVehicle: boolean };

export type SearchCustomersQueryVariables = Types.Exact<{
  body: Types.SearchCustomersRq;
}>;


export type SearchCustomersQuery = { searchCustomers: Array<{ token: string, first_name: string, last_name: string, mobile: string, national_code: string }> };

export type CreateUnauthorizedTrafficMutationVariables = Types.Exact<{
  body: Types.CreateUnauthorizedTrafficRq;
}>;


export type CreateUnauthorizedTrafficMutation = { createUnauthorizedTraffic: boolean };

export type UpdateCustomerAccessMutationVariables = Types.Exact<{
  body: Types.UpdateCustomerAccessRq;
}>;


export type UpdateCustomerAccessMutation = { updateCustomerAccess: boolean };

export type FetchDevicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchDevicesQuery = { fetchDevices: Array<{ token: string, type: Types.E_DeviceType, ip: string, name: string, brand_name?: string | null, username?: string | null, password?: string | null, channel?: number | null }> };

export type CreateDeviceMutationVariables = Types.Exact<{
  body: Types.CreateDeviceRq;
}>;


export type CreateDeviceMutation = { createDevice: boolean };

export type EditDeviceMutationVariables = Types.Exact<{
  body: Types.EditDeviceRq;
}>;


export type EditDeviceMutation = { editDevice: boolean };

export type PingAllDevicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PingAllDevicesQuery = { pingAllDevices: Array<{ name: string, ip: string, type: Types.E_DeviceType, is_alive: boolean }> };

export type ExportReportTrafficListMutationVariables = Types.Exact<{
  body: Types.ReportTrafficListRq;
}>;


export type ExportReportTrafficListMutation = { exportReportTrafficList: { data: string, format: string } };

export type ExportCustomerListMutationVariables = Types.Exact<{
  body: Types.FetchCustomersRq;
}>;


export type ExportCustomerListMutation = { exportCustomerList: { data: string, format: string } };

export type FetchIdentifiersQueryVariables = Types.Exact<{
  body: Types.FetchIdentifiersRq;
}>;


export type FetchIdentifiersQuery = { fetchIdentifiers: { count: number, items: Array<{ token: string, serial: string, number: string, type: Types.E_IdentifierType, available: boolean }> } };

export type CreateIdentifierMutationVariables = Types.Exact<{
  body: Types.CreateIdentifierRq;
}>;


export type CreateIdentifierMutation = { createIdentifier: boolean };

export type BulkCreateIdentifiersMutationVariables = Types.Exact<{
  body: Types.BulkCreateIdentifiersRq;
}>;


export type BulkCreateIdentifiersMutation = { bulkCreateIdentifiers: boolean };

export type EditIdentifierMutationVariables = Types.Exact<{
  body: Types.EditIdentifierRq;
}>;


export type EditIdentifierMutation = { editIdentifier: boolean };

export type ToggleIdentifierStatusMutationVariables = Types.Exact<{
  body: Types.ToggleIdentifierStatusRq;
}>;


export type ToggleIdentifierStatusMutation = { toggleIdentifierStatus: boolean };

export type SearchIdentifiersQueryVariables = Types.Exact<{
  body: Types.SearchIdentifiersRq;
}>;


export type SearchIdentifiersQuery = { searchIdentifiers: Array<{ token: string, serial: string, number: string, type: Types.E_IdentifierType, available: boolean, in_use: boolean }> };

export type ParkingInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ParkingInfoQuery = { parkingInfo: { name: string, server_uuid?: string | null, clients_count: number, license?: string | null, uhf: boolean, csn: boolean, plate_recognition: boolean } };

export type UpdateParkingLicenseMutationVariables = Types.Exact<{
  body: Types.UpdateParkingLicenseRq;
}>;


export type UpdateParkingLicenseMutation = { updateParkingLicense: boolean };

export type ReportTrafficListQueryVariables = Types.Exact<{
  body: Types.ReportTrafficListRq;
}>;


export type ReportTrafficListQuery = { reportTrafficList: { count: number, items: Array<{ client_name?: string | null, user_name?: string | null, plate_serial?: string | null, customer_name?: string | null, tag_serial?: string | null, card_serial?: string | null, created_at: any, plate_image?: string | null, driver_image?: string | null, authorized?: boolean | null, type?: Types.E_ClientType | null, description?: string | null }> } };

export type ClientLast10TrafficsSubSubscriptionVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type ClientLast10TrafficsSubSubscription = { clientLast10TrafficsSub: Array<{ token: string, customer?: { first_name: string } | null }> };

export type FetchRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchRolesQuery = { fetchRoles: Array<{ token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> }> };

export type FetchRoleByTokenQueryVariables = Types.Exact<{
  body: Types.FetchRoleByTokenRq;
}>;


export type FetchRoleByTokenQuery = { fetchRoleByToken: { token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> } };

export type CreateNewRoleMutationVariables = Types.Exact<{
  body: Types.CreateNewRoleRq;
}>;


export type CreateNewRoleMutation = { createNewRole: boolean };

export type UpdateRoleMutationVariables = Types.Exact<{
  body: Types.UpdateRoleRq;
}>;


export type UpdateRoleMutation = { updateRole: boolean };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: { token: string, username: string, fullname: string, is_active: boolean, profile_image?: string | null, expiration_date: string, role: { token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> } } };

export type UserLoginMutationVariables = Types.Exact<{
  body: Types.UserLoginRq;
}>;


export type UserLoginMutation = { userLogin: string };

export type FetchUsersListQueryVariables = Types.Exact<{
  body: Types.FetchUsersListRq;
}>;


export type FetchUsersListQuery = { fetchUsersList: { count: number, items: Array<{ token: string, username: string, fullname: string, is_active: boolean, profile_image?: string | null, expiration_date: string, role: { token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> } }> } };

export type ToggleUserStatusMutationVariables = Types.Exact<{
  body: Types.ToggleUserStatus;
}>;


export type ToggleUserStatusMutation = { toggleUserStatus: boolean };

export type CreateUserMutationVariables = Types.Exact<{
  body: Types.CreateUserRq;
}>;


export type CreateUserMutation = { createUser: boolean };

export type EditUserMutationVariables = Types.Exact<{
  body: Types.EditUserRq;
}>;


export type EditUserMutation = { editUser: boolean };

export type SearchUsersByFullnameQueryVariables = Types.Exact<{
  body: Types.SearchUsersByFullnameRq;
}>;


export type SearchUsersByFullnameQuery = { searchUsersByFullname: Array<{ token: string, username: string, fullname: string }> };
