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


export type FetchSchedulesQuery = { fetchSchedules: Array<{ token: string, title: string, start_date: string, end_date?: string | null, start_time: string, end_time: string }> };

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

export type ParkingInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ParkingInfoQuery = { parkingInfo: { name: string, server_uuid?: string | null, clients_count: number, license?: string | null, uhf: boolean, csn: boolean, plate_recognition: boolean } };

export type UpdateParkingLicenseMutationVariables = Types.Exact<{
  body: Types.UpdateParkingLicenseRq;
}>;


export type UpdateParkingLicenseMutation = { updateParkingLicense: boolean };

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
