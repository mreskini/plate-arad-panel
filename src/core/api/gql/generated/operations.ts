import * as Types from './schemas';

export type ParkingInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ParkingInfoQuery = { parkingInfo: { name: string, code: string, capacity: number, cash_adjustment: number, card_issuance_fee: number, default_cash_group?: { token: string, title: string, type: Types.E_GroupType } | null } };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: { token: string, username: string, fullname: string, rate_limit: number, profile_image?: string | null, manual_exit_monthly_limit?: number | null, manual_exit_daily_limit?: number | null, is_active: boolean, expiration_date: string, role: { token: string, name: string, permissions: Array<{ link: string }> } } };

export type UserLoginMutationVariables = Types.Exact<{
  body: Types.UserLoginRq;
}>;


export type UserLoginMutation = { userLogin: string };
