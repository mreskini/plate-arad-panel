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

export type AddIdentifierToCustomerRq = {
  customer_token: Scalars['String']['input'];
  identifier_token: Scalars['String']['input'];
};

export type BulkCreateIdentifiersRq = {
  identifiers: Array<BulkIdentifierItem>;
};

export type BulkIdentifierItem = {
  number: Scalars['String']['input'];
  serial: Scalars['String']['input'];
  type: E_IdentifierType;
};

export type Client = {
  camera?: Maybe<Device>;
  name: Scalars['String']['output'];
  reader?: Maybe<Device>;
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
  reader_token?: InputMaybe<Scalars['String']['input']>;
  relay_token?: InputMaybe<Scalars['String']['input']>;
  type: E_ClientType;
};

export type CreateCustomerRq = {
  description?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  last_name: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  national_code: Scalars['String']['input'];
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

export type CreateIdentifierRq = {
  number: Scalars['String']['input'];
  serial: Scalars['String']['input'];
  type: E_IdentifierType;
};

export type CreateNewRoleRq = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
};

export type CreateNormalTrafficRq = {
  card_serial?: InputMaybe<Scalars['String']['input']>;
  client_token?: InputMaybe<Scalars['String']['input']>;
  customer_token?: InputMaybe<Scalars['String']['input']>;
  driver_image?: InputMaybe<Scalars['String']['input']>;
  plate_image?: InputMaybe<Scalars['String']['input']>;
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  tag_serial?: InputMaybe<Scalars['String']['input']>;
};

export type CreateScheduleRq = {
  allowed_days: Array<E_DayOfWeek>;
  end_date?: InputMaybe<Scalars['String']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUnauthorizedTrafficRq = {
  card_serial?: InputMaybe<Scalars['String']['input']>;
  client_token?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  driver_image?: InputMaybe<Scalars['String']['input']>;
  plate_image?: InputMaybe<Scalars['String']['input']>;
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  tag_serial?: InputMaybe<Scalars['String']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserRq = {
  expiration_date: Scalars['DateTime']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  role_token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateVehicleRq = {
  color?: InputMaybe<Scalars['String']['input']>;
  customer_token: Scalars['String']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  manufacture_year?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  plate_number: Scalars['String']['input'];
};

export type Customer = {
  access?: Maybe<AccessControl>;
  apb: Scalars['Boolean']['output'];
  blocked: Scalars['Boolean']['output'];
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  identifiers?: Maybe<Array<Identifier>>;
  image_url?: Maybe<Scalars['String']['output']>;
  last_name: Scalars['String']['output'];
  mobile: Scalars['String']['output'];
  national_code: Scalars['String']['output'];
  token: Scalars['String']['output'];
  vehicles: Array<Vehicle>;
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

export enum E_DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum E_DeviceType {
  Camera = 'CAMERA',
  Reader = 'READER',
  Relay = 'RELAY'
}

export enum E_IdentifierType {
  Card = 'CARD',
  Tag = 'TAG',
  Vehicle = 'VEHICLE'
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
  reader_token?: InputMaybe<Scalars['String']['input']>;
  relay_token?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type: E_ClientType;
};

export type EditCustomerRq = {
  description?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  national_code?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
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

export type EditIdentifierRq = {
  number?: InputMaybe<Scalars['String']['input']>;
  serial?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<E_IdentifierType>;
};

export type EditScheduleRq = {
  allowed_days?: InputMaybe<Array<E_DayOfWeek>>;
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

export type FetchCustomersRq = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FetchCustomersRs = {
  count: Scalars['Float']['output'];
  items: Array<Customer>;
};

export type FetchIdentifiersRq = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FetchIdentifiersRs = {
  count: Scalars['Float']['output'];
  items: Array<Identifier>;
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

export type Identifier = {
  available: Scalars['Boolean']['output'];
  in_use: Scalars['Boolean']['output'];
  number: Scalars['String']['output'];
  serial: Scalars['String']['output'];
  token: Scalars['String']['output'];
  type: E_IdentifierType;
};

export type Mutation = {
  addIdentifierToCustomer: Scalars['Boolean']['output'];
  bulkCreateIdentifiers: Scalars['Boolean']['output'];
  createAccessControl: Scalars['Boolean']['output'];
  createClient: Scalars['Boolean']['output'];
  createCustomer: Scalars['Boolean']['output'];
  createDevice: Scalars['Boolean']['output'];
  createIdentifier: Scalars['Boolean']['output'];
  createNewRole: Scalars['Boolean']['output'];
  createNormalTraffic: Scalars['Boolean']['output'];
  createSchedule: Scalars['Boolean']['output'];
  createUnauthorizedTraffic: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  createVehicle: Scalars['Boolean']['output'];
  deleteClient: Scalars['Boolean']['output'];
  editAccessControl: Scalars['Boolean']['output'];
  editClient: Scalars['Boolean']['output'];
  editCustomer: Scalars['Boolean']['output'];
  editDevice: Scalars['Boolean']['output'];
  editIdentifier: Scalars['Boolean']['output'];
  editSchedule: Scalars['Boolean']['output'];
  editUser: Scalars['Boolean']['output'];
  toggleCustomerApb: Scalars['Boolean']['output'];
  toggleCustomerBlocked: Scalars['Boolean']['output'];
  toggleIdentifierStatus: Scalars['Boolean']['output'];
  toggleUserStatus: Scalars['Boolean']['output'];
  updateCustomerAccess: Scalars['Boolean']['output'];
  updateParkingLicense: Scalars['Boolean']['output'];
  updateRole: Scalars['Boolean']['output'];
  userLogin: Scalars['String']['output'];
};


export type MutationAddIdentifierToCustomerArgs = {
  body: AddIdentifierToCustomerRq;
};


export type MutationBulkCreateIdentifiersArgs = {
  body: BulkCreateIdentifiersRq;
};


export type MutationCreateAccessControlArgs = {
  body: CreateAccessControlRq;
};


export type MutationCreateClientArgs = {
  body: CreateClientRq;
};


export type MutationCreateCustomerArgs = {
  body: CreateCustomerRq;
};


export type MutationCreateDeviceArgs = {
  body: CreateDeviceRq;
};


export type MutationCreateIdentifierArgs = {
  body: CreateIdentifierRq;
};


export type MutationCreateNewRoleArgs = {
  body: CreateNewRoleRq;
};


export type MutationCreateNormalTrafficArgs = {
  body: CreateNormalTrafficRq;
};


export type MutationCreateScheduleArgs = {
  body: CreateScheduleRq;
};


export type MutationCreateUnauthorizedTrafficArgs = {
  body: CreateUnauthorizedTrafficRq;
};


export type MutationCreateUserArgs = {
  body: CreateUserRq;
};


export type MutationCreateVehicleArgs = {
  body: CreateVehicleRq;
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


export type MutationEditCustomerArgs = {
  body: EditCustomerRq;
};


export type MutationEditDeviceArgs = {
  body: EditDeviceRq;
};


export type MutationEditIdentifierArgs = {
  body: EditIdentifierRq;
};


export type MutationEditScheduleArgs = {
  body: EditScheduleRq;
};


export type MutationEditUserArgs = {
  body: EditUserRq;
};


export type MutationToggleCustomerApbArgs = {
  body: ToggleCustomerApbRq;
};


export type MutationToggleCustomerBlockedArgs = {
  body: ToggleCustomerBlockedRq;
};


export type MutationToggleIdentifierStatusArgs = {
  body: ToggleIdentifierStatusRq;
};


export type MutationToggleUserStatusArgs = {
  body: ToggleUserStatus;
};


export type MutationUpdateCustomerAccessArgs = {
  body: UpdateCustomerAccessRq;
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
  fetchCustomers: FetchCustomersRs;
  fetchDevices: Array<Device>;
  fetchIdentifiers: FetchIdentifiersRs;
  fetchRoleByToken: Role;
  fetchRoles: Array<Role>;
  fetchScheduleByToken: Schedule;
  fetchSchedules: Array<Schedule>;
  fetchUsersList: FetchUsersListRs;
  parkingInfo: Parking;
  pingAllDevices: Array<PingAllDevicesRs>;
  reportTrafficList: ReportTrafficListRs;
  searchCustomers: Array<Customer>;
  searchIdentifiers: Array<Identifier>;
  searchUsersByFullname: Array<User>;
};


export type QueryFetchAccessControlByTokenArgs = {
  body: FetchAccessControlByTokenRq;
};


export type QueryFetchCustomersArgs = {
  body: FetchCustomersRq;
};


export type QueryFetchIdentifiersArgs = {
  body: FetchIdentifiersRq;
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


export type QueryReportTrafficListArgs = {
  body: ReportTrafficListRq;
};


export type QuerySearchCustomersArgs = {
  body: SearchCustomersRq;
};


export type QuerySearchIdentifiersArgs = {
  body: SearchIdentifiersRq;
};


export type QuerySearchUsersByFullnameArgs = {
  body: SearchUsersByFullnameRq;
};

export type ReportTrafficListRq = {
  authorized?: InputMaybe<Scalars['Boolean']['input']>;
  card_serial?: InputMaybe<Scalars['String']['input']>;
  client_token?: InputMaybe<Scalars['String']['input']>;
  customer_token?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  has_driver_image?: InputMaybe<Scalars['Boolean']['input']>;
  has_plate_image?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  tag_serial?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<E_ClientType>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportTrafficListRs = {
  count: Scalars['Float']['output'];
  items: Array<TrafficItem>;
};

export type Role = {
  is_default: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  token: Scalars['String']['output'];
};

export type Schedule = {
  allowed_days: Array<E_DayOfWeek>;
  end_date?: Maybe<Scalars['String']['output']>;
  end_time: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  start_time: Scalars['String']['output'];
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type SearchCustomersRq = {
  search: Scalars['String']['input'];
};

export type SearchIdentifiersRq = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUsersByFullnameRq = {
  search: Scalars['String']['input'];
};

export type ToggleCustomerApbRq = {
  token: Scalars['String']['input'];
};

export type ToggleCustomerBlockedRq = {
  token: Scalars['String']['input'];
};

export type ToggleIdentifierStatusRq = {
  token: Scalars['String']['input'];
};

export type ToggleUserStatus = {
  token: Scalars['String']['input'];
};

export type TrafficItem = {
  authorized?: Maybe<Scalars['Boolean']['output']>;
  card_serial?: Maybe<Scalars['String']['output']>;
  client_name?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  customer_name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  driver_image?: Maybe<Scalars['String']['output']>;
  plate_image?: Maybe<Scalars['String']['output']>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  tag_serial?: Maybe<Scalars['String']['output']>;
  type?: Maybe<E_ClientType>;
  user_name?: Maybe<Scalars['String']['output']>;
};

export type UpdateCustomerAccessRq = {
  access_control_token: Scalars['String']['input'];
  customer_token: Scalars['String']['input'];
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

export type Vehicle = {
  color?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  manufacture_year?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  plate_number: Scalars['String']['output'];
  token: Scalars['String']['output'];
};
