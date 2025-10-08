import * as Types from './schemas';

export type FetchDevicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchDevicesQuery = { fetchDevices: Array<{ token: string, type: Types.E_DeviceType, ip: string, name: string, brand_name?: string | null, username?: string | null, password?: string | null }> };

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


export type ParkingInfoQuery = { parkingInfo: { name: string, code: string, capacity: number, cash_adjustment: number, card_issuance_fee: number, default_cash_group?: { token: string, title: string, type: Types.E_GroupType } | null } };

export type FetchRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchRolesQuery = { fetchRoles: Array<{ token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> }> };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: { token: string, username: string, fullname: string, rate_limit: number, profile_image?: string | null, manual_exit_monthly_limit?: number | null, manual_exit_daily_limit?: number | null, is_active: boolean, expiration_date: string, role: { token: string, name: string, permissions: Array<{ link: string }> } } };

export type UserLoginMutationVariables = Types.Exact<{
  body: Types.UserLoginRq;
}>;


export type UserLoginMutation = { userLogin: string };

export type FetchUsersListQueryVariables = Types.Exact<{
  body: Types.FetchUsersListRq;
}>;


export type FetchUsersListQuery = { fetchUsersList: { count: number, items: Array<{ token: string, is_active: boolean, username: string, fullname: string, profile_image?: string | null, manual_exit_daily_limit?: number | null, manual_exit_monthly_limit?: number | null, expiration_date: string, rate_limit: number, role: { token: string, name: string, is_default: boolean, permissions: Array<{ link: string }> } }> } };
