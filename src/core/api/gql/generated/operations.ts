import * as Types from './schemas';

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

export type FetchRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchRolesQuery = { fetchRoles: Array<{ token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> }> };

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
