export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AccessControl = {
  client: Client;
  schedule: Schedule;
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Client = {
  camera?: Maybe<Device>;
  name: Scalars['String']['output'];
  relay?: Maybe<Device>;
  token: Scalars['String']['output'];
  type: E_ClientType;
};

export type CreateAccessControlRq = {
  client_token: Scalars['String']['input'];
  schedule_token: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateClientRq = {
  camera_token?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  relay_token?: InputMaybe<Scalars['String']['input']>;
  type: E_ClientType;
};

export type CreateDeviceRq = {
  brand_name?: InputMaybe<Scalars['String']['input']>;
  channel?: InputMaybe<Scalars['Float']['input']>;
  ip: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  type: E_DeviceType;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNewRoleRq = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
};

export type CreateScheduleRq = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUserRq = {
  expiration_date: Scalars['DateTime']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  role_token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteClientRq = {
  token: Scalars['String']['input'];
};

export type Device = {
  brand_name?: Maybe<Scalars['String']['output']>;
  channel?: Maybe<Scalars['Float']['output']>;
  ip: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: E_DeviceType;
  username?: Maybe<Scalars['String']['output']>;
};

export enum E_ClientType {
  Input = 'INPUT',
  Output = 'OUTPUT'
}

export enum E_DeviceType {
  Camera = 'CAMERA',
  Relay = 'RELAY'
}

export type EditAccessControlRq = {
  client_token?: InputMaybe<Scalars['String']['input']>;
  schedule_token?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type EditClientRq = {
  camera_token?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  relay_token?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type: E_ClientType;
};

export type EditDeviceRq = {
  brand_name?: InputMaybe<Scalars['String']['input']>;
  channel?: InputMaybe<Scalars['Float']['input']>;
  ip?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<E_DeviceType>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type EditScheduleRq = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type EditUserRq = {
  expiration_date?: InputMaybe<Scalars['DateTime']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  role_token?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type FetchAccessControlByTokenRq = {
  token: Scalars['String']['input'];
};

export type FetchRoleByTokenRq = {
  token: Scalars['String']['input'];
};

export type FetchScheduleByTokenRq = {
  token: Scalars['String']['input'];
};

export type FetchUsersListRq = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type FetchUsersListRs = {
  count: Scalars['Float']['output'];
  items: Array<User>;
};

export type Mutation = {
  createAccessControl: Scalars['Boolean']['output'];
  createClient: Scalars['Boolean']['output'];
  createDevice: Scalars['Boolean']['output'];
  createNewRole: Scalars['Boolean']['output'];
  createSchedule: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteClient: Scalars['Boolean']['output'];
  editAccessControl: Scalars['Boolean']['output'];
  editClient: Scalars['Boolean']['output'];
  editDevice: Scalars['Boolean']['output'];
  editSchedule: Scalars['Boolean']['output'];
  editUser: Scalars['Boolean']['output'];
  toggleUserStatus: Scalars['Boolean']['output'];
  updateParkingLicense: Scalars['Boolean']['output'];
  updateRole: Scalars['Boolean']['output'];
  userLogin: Scalars['String']['output'];
};


export type MutationCreateAccessControlArgs = {
  body: CreateAccessControlRq;
};


export type MutationCreateClientArgs = {
  body: CreateClientRq;
};


export type MutationCreateDeviceArgs = {
  body: CreateDeviceRq;
};


export type MutationCreateNewRoleArgs = {
  body: CreateNewRoleRq;
};


export type MutationCreateScheduleArgs = {
  body: CreateScheduleRq;
};


export type MutationCreateUserArgs = {
  body: CreateUserRq;
};


export type MutationDeleteClientArgs = {
  body: DeleteClientRq;
};


export type MutationEditAccessControlArgs = {
  body: EditAccessControlRq;
};


export type MutationEditClientArgs = {
  body: EditClientRq;
};


export type MutationEditDeviceArgs = {
  body: EditDeviceRq;
};


export type MutationEditScheduleArgs = {
  body: EditScheduleRq;
};


export type MutationEditUserArgs = {
  body: EditUserRq;
};


export type MutationToggleUserStatusArgs = {
  body: ToggleUserStatus;
};


export type MutationUpdateParkingLicenseArgs = {
  body: UpdateParkingLicenseRq;
};


export type MutationUpdateRoleArgs = {
  body: UpdateRoleRq;
};


export type MutationUserLoginArgs = {
  body: UserLoginRq;
};

export type Parking = {
  clients_count: Scalars['Float']['output'];
  csn: Scalars['Boolean']['output'];
  license?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  plate_recognition: Scalars['Boolean']['output'];
  server_uuid?: Maybe<Scalars['String']['output']>;
  uhf: Scalars['Boolean']['output'];
};

export type Permission = {
  link: Scalars['String']['output'];
};

export type PingAllDevicesRs = {
  ip: Scalars['String']['output'];
  is_alive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: E_DeviceType;
};

export type Query = {
  currentUser: User;
  fetchAccessControlByToken: AccessControl;
  fetchAccessControls: Array<AccessControl>;
  fetchClients: Array<Client>;
  fetchDevices: Array<Device>;
  fetchRoleByToken: Role;
  fetchRoles: Array<Role>;
  fetchScheduleByToken: Schedule;
  fetchSchedules: Array<Schedule>;
  fetchUsersList: FetchUsersListRs;
  parkingInfo: Parking;
  pingAllDevices: Array<PingAllDevicesRs>;
};


export type QueryFetchAccessControlByTokenArgs = {
  body: FetchAccessControlByTokenRq;
};


export type QueryFetchRoleByTokenArgs = {
  body: FetchRoleByTokenRq;
};


export type QueryFetchScheduleByTokenArgs = {
  body: FetchScheduleByTokenRq;
};


export type QueryFetchUsersListArgs = {
  body: FetchUsersListRq;
};

export type Role = {
  is_default: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  token: Scalars['String']['output'];
};

export type Schedule = {
  end_date?: Maybe<Scalars['String']['output']>;
  end_time: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  start_time: Scalars['String']['output'];
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type ToggleUserStatus = {
  token: Scalars['String']['input'];
};

export type UpdateParkingLicenseRq = {
  clients: Scalars['Float']['input'];
  csn: Scalars['Boolean']['input'];
  license: Scalars['String']['input'];
  plate_recognition: Scalars['Boolean']['input'];
  server_uuid: Scalars['String']['input'];
  uhf: Scalars['Boolean']['input'];
};

export type UpdateRoleRq = {
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  token: Scalars['String']['input'];
};

export type User = {
  expiration_date: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  is_active: Scalars['Boolean']['output'];
  profile_image?: Maybe<Scalars['String']['output']>;
  role: Role;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserLoginRq = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};
