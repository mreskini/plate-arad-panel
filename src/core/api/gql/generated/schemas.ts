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

export type AddBlockedCarRq = {
  description?: InputMaybe<Scalars['String']['input']>;
  plate_serial: Scalars['String']['input'];
  submit_date: Scalars['DateTime']['input'];
};

export type AddInactiveCarRq = {
  description: Scalars['String']['input'];
  plate_serial: Scalars['String']['input'];
  submit_date: Scalars['DateTime']['input'];
};

export type AddOffDayRq = {
  day: Scalars['DateTime']['input'];
};

export type Backup = {
  created_at: Scalars['DateTime']['output'];
  path: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type BlockedCar = {
  created_at: Scalars['DateTime']['output'];
  created_by: User;
  description?: Maybe<Scalars['String']['output']>;
  is_blocked: Scalars['Boolean']['output'];
  plate_serial: Scalars['String']['output'];
  submit_date: Scalars['String']['output'];
  token: Scalars['String']['output'];
  unblocked_at?: Maybe<Scalars['DateTime']['output']>;
  unblocked_by?: Maybe<User>;
  updated_at: Scalars['DateTime']['output'];
};

export type BulkCardItem = {
  card_number: Scalars['String']['input'];
  csn: Scalars['String']['input'];
  type: E_CardType;
};

export type BulkCreateCardsRq = {
  cards: Array<BulkCardItem>;
};

export type CalculateGroupPriceRq = {
  discount_token?: InputMaybe<Scalars['String']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
  in_time: Scalars['DateTime']['input'];
  is_temporal?: InputMaybe<Scalars['Boolean']['input']>;
  out_time: Scalars['DateTime']['input'];
};

export type Card = {
  card_number: Scalars['String']['output'];
  csn: Scalars['String']['output'];
  is_active: Scalars['Boolean']['output'];
  is_in_use: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  type: E_CardType;
};

export type CheckCustomerSubByCardTokenRq = {
  card_token: Scalars['String']['input'];
  plate_image?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type CheckCustomerSubByCardTokenRs = {
  customer: Customer;
  is_valid: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type Client = {
  controller?: Maybe<Device>;
  driver_cam?: Maybe<Device>;
  ip_address: Scalars['String']['output'];
  name: Scalars['String']['output'];
  plate_cam?: Maybe<Device>;
  pos?: Maybe<Pos>;
  reader?: Maybe<Device>;
  relay?: Maybe<Device>;
  test_mode: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  type: E_ClientType;
};

export type ClientTrafficStats = {
  date: Scalars['String']['output'];
  items: Array<ClientTrafficStatsItem>;
};

export type ClientTrafficStatsItem = {
  client_name: Scalars['String']['output'];
  client_type: E_ClientType;
  traffic_count: Scalars['Float']['output'];
  user_fullname: Scalars['String']['output'];
};

export type ComparingIncomes = {
  date: Scalars['String']['output'];
  income1: Scalars['Float']['output'];
  income2: Scalars['Float']['output'];
};

export type CreateCardIssuanceTxRq = {
  card_token: Scalars['String']['input'];
  is_non_payment?: InputMaybe<Scalars['Boolean']['input']>;
  payment_method: E_TransactionType;
};

export type CreateCardRq = {
  card_number: Scalars['String']['input'];
  csn: Scalars['String']['input'];
  type: E_CardType;
};

export type CreateClientRq = {
  controller_token?: InputMaybe<Scalars['String']['input']>;
  driver_cam_token?: InputMaybe<Scalars['String']['input']>;
  ip_address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  plate_cam_token?: InputMaybe<Scalars['String']['input']>;
  pos_token?: InputMaybe<Scalars['String']['input']>;
  reader_token?: InputMaybe<Scalars['String']['input']>;
  relay_token?: InputMaybe<Scalars['String']['input']>;
  type: E_ClientType;
};

export type CreateCustomerDesktopRq = {
  fullname: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  plate_serial1: Scalars['String']['input'];
};

export type CreateCustomerRq = {
  apb: Scalars['Boolean']['input'];
  daily_limit?: InputMaybe<Scalars['Int']['input']>;
  fullname: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  monthly_limit?: InputMaybe<Scalars['Int']['input']>;
  plate_disable: Scalars['Boolean']['input'];
  plate_serial1?: InputMaybe<Scalars['String']['input']>;
  plate_serial2?: InputMaybe<Scalars['String']['input']>;
  plate_serial3?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDeviceRq = {
  brand_name?: InputMaybe<Scalars['String']['input']>;
  ip: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  type: E_DeviceType;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDiscountCodesRq = {
  count: Scalars['Float']['input'];
  token: Scalars['String']['input'];
};

export type CreateDiscountRq = {
  amount: Scalars['Float']['input'];
  daily_limit?: InputMaybe<Scalars['Float']['input']>;
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  type: E_DiscountType;
};

export type CreateGroupRq = {
  credit?: InputMaybe<CreditSettingsInput>;
  daily?: InputMaybe<DailyRateInput>;
  daily_rates?: InputMaybe<DailyRatesInput>;
  free_entry_duration?: InputMaybe<Scalars['Float']['input']>;
  free_exit_duration?: InputMaybe<Scalars['Float']['input']>;
  tax: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  type: E_GroupType;
};

export type CreateNewRoleRq = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
};

export type CreatePosRq = {
  ip: Scalars['String']['input'];
  num: Scalars['Float']['input'];
  terminal: Scalars['Float']['input'];
};

export type CreateSubTxRq = {
  card_to_card_amount?: InputMaybe<Scalars['Float']['input']>;
  card_token: Scalars['String']['input'];
  cash_amount?: InputMaybe<Scalars['Float']['input']>;
  customer_token: Scalars['String']['input'];
  group_token: Scalars['String']['input'];
  payment_method: E_TransactionType;
  pos_amount?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateUserRq = {
  expiration_date: Scalars['DateTime']['input'];
  fullname: Scalars['String']['input'];
  manual_exit_daily_limit?: InputMaybe<Scalars['Float']['input']>;
  manual_exit_monthly_limit?: InputMaybe<Scalars['Float']['input']>;
  password: Scalars['String']['input'];
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  rate_limit: Scalars['Float']['input'];
  role_token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreditSettings = {
  allowed_days: Array<E_DayOfWeek>;
  amount: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
};

export type CreditSettingsInput = {
  allowed_days: Array<E_DayOfWeek>;
  amount: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
};

export type Customer = {
  apb: Scalars['Boolean']['output'];
  card?: Maybe<Card>;
  daily_limit?: Maybe<Scalars['Float']['output']>;
  expiration_date?: Maybe<Scalars['String']['output']>;
  fullname: Scalars['String']['output'];
  group?: Maybe<Group>;
  is_active: Scalars['Boolean']['output'];
  last_traffic?: Maybe<Scalars['DateTime']['output']>;
  mobile: Scalars['String']['output'];
  monthly_limit?: Maybe<Scalars['Float']['output']>;
  plate_disable: Scalars['Boolean']['output'];
  plate_serial1?: Maybe<Scalars['String']['output']>;
  plate_serial2?: Maybe<Scalars['String']['output']>;
  plate_serial3?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type CustomerExpiredItem = {
  card_number?: Maybe<Scalars['String']['output']>;
  customer_fullname: Scalars['String']['output'];
  expiration_date: Scalars['String']['output'];
  group_title?: Maybe<Scalars['String']['output']>;
  issue_date: Scalars['DateTime']['output'];
  mobile: Scalars['String']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
};

export type CustomerExtendItem = {
  card_number: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  customer_fullname: Scalars['String']['output'];
  expiration_date: Scalars['String']['output'];
  group_title: Scalars['String']['output'];
  mobile: Scalars['String']['output'];
  paid_amount: Scalars['Float']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
  user_fullname: Scalars['String']['output'];
};

export type CustomerLog = {
  card: Card;
  created_at: Scalars['DateTime']['output'];
  customer: Customer;
  description: Scalars['String']['output'];
  expiration_date: Scalars['String']['output'];
  group: Group;
  image?: Maybe<Scalars['String']['output']>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: E_CustomerLogTrafficType;
  user: User;
};

export type CustomerLogItem = {
  card_number: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  customer_fullname: Scalars['String']['output'];
  description: Scalars['String']['output'];
  expiration_date?: Maybe<Scalars['String']['output']>;
  group_title: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  type: E_CustomerLogTrafficType;
  user_fullname: Scalars['String']['output'];
};

export type DailyHourlyIncome = {
  date: Scalars['String']['output'];
  hourly_incomes: Array<HourlyIncome>;
};

export type DailyIncome = {
  announced_income: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  system_income: Scalars['Float']['output'];
};

export type DailyIncomeItem = {
  date: Scalars['String']['output'];
  exit_traffics_count: Scalars['Float']['output'];
  net_income: Scalars['Float']['output'];
  total_income: Scalars['Float']['output'];
  total_tax: Scalars['Float']['output'];
};

export type DailyRate = {
  entry_duration: Scalars['Float']['output'];
  entry_fee: Scalars['Float']['output'];
  hourly_duration: Scalars['Float']['output'];
  hourly_fee: Scalars['Float']['output'];
  nightly_duration: Scalars['Float']['output'];
  nightly_fee: Scalars['Float']['output'];
};

export type DailyRateInput = {
  entry_duration: Scalars['Float']['input'];
  entry_fee: Scalars['Float']['input'];
  hourly_duration: Scalars['Float']['input'];
  hourly_fee: Scalars['Float']['input'];
  nightly_duration: Scalars['Float']['input'];
  nightly_fee: Scalars['Float']['input'];
};

export type DailyRates = {
  friday: DailyRate;
  holidays: DailyRate;
  monday: DailyRate;
  saturday: DailyRate;
  sunday: DailyRate;
  thursday: DailyRate;
  tuesday: DailyRate;
  wednesday: DailyRate;
};

export type DailyRatesInput = {
  friday: DailyRateInput;
  holidays: DailyRateInput;
  monday: DailyRateInput;
  saturday: DailyRateInput;
  sunday: DailyRateInput;
  thursday: DailyRateInput;
  tuesday: DailyRateInput;
  wednesday: DailyRateInput;
};

export type DeleteBlockedCarRq = {
  token: Scalars['String']['input'];
};

export type DeleteClientRq = {
  token: Scalars['String']['input'];
};

export type DeleteInactiveCarRq = {
  token: Scalars['String']['input'];
};

export type DeleteOffDayRq = {
  token: Scalars['String']['input'];
};

export type Device = {
  brand_name?: Maybe<Scalars['String']['output']>;
  ip: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: E_DeviceType;
  username?: Maybe<Scalars['String']['output']>;
};

export type Discount = {
  amount: Scalars['Float']['output'];
  daily_limit?: Maybe<Scalars['Float']['output']>;
  end: Scalars['DateTime']['output'];
  is_active: Scalars['Boolean']['output'];
  start: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
  type: E_DiscountType;
};

export type DiscountManualExitItem = {
  card_number: Scalars['String']['output'];
  discount_price: Scalars['Float']['output'];
  exit: Scalars['DateTime']['output'];
  exit_user_fullname: Scalars['String']['output'];
  initial_price: Scalars['Float']['output'];
  paid_price: Scalars['Float']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
  presence_duration?: Maybe<Scalars['Float']['output']>;
  temporal_exit: Scalars['DateTime']['output'];
  temporal_exit_amount: Scalars['Float']['output'];
  temporal_exit_type: E_TemporalExitType;
};

export type DiscountUsageItem = {
  amount: Scalars['Float']['output'];
  discount_amount: Scalars['Float']['output'];
  initial_amount: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  paid_amount: Scalars['Float']['output'];
  type: E_DiscountType;
  usage_count: Scalars['Float']['output'];
  used_date: Scalars['DateTime']['output'];
};

export type DownloadDiscountCodesRq = {
  token: Scalars['String']['input'];
};

export type DownloadDiscountCodesRs = {
  data: Scalars['String']['output'];
  format: Scalars['String']['output'];
};

export type DownloadReportRs = {
  data: Scalars['String']['output'];
  format: Scalars['String']['output'];
};

export enum E_CardType {
  Cash = 'CASH',
  Credit = 'CREDIT'
}

export enum E_ClientType {
  Input = 'INPUT',
  InputOutput = 'INPUT_OUTPUT',
  Output = 'OUTPUT'
}

export enum E_CustomerLogTrafficType {
  Entrance = 'ENTRANCE',
  Exit = 'EXIT'
}

export enum E_DayOfWeek {
  Friday = 'FRIDAY',
  Holidays = 'HOLIDAYS',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum E_DeviceType {
  Controller = 'CONTROLLER',
  DriverCamera = 'DRIVER_CAMERA',
  PlateCamera = 'PLATE_CAMERA',
  Reader = 'READER',
  Relay = 'RELAY'
}

export enum E_DiscountType {
  Percentage = 'PERCENTAGE',
  Price = 'PRICE',
  Time = 'TIME'
}

export enum E_DisplayMethod {
  Count = 'COUNT',
  Percentage = 'PERCENTAGE'
}

export enum E_GroupType {
  CashDaily = 'CASH_DAILY',
  CashNormal = 'CASH_NORMAL',
  CreditTime = 'CREDIT_TIME'
}

export enum E_TemporalExitType {
  Percentage = 'PERCENTAGE',
  Value = 'VALUE'
}

export enum E_TrafficType {
  Cash = 'CASH',
  Credit = 'CREDIT'
}

export enum E_TransactionLabel {
  CardIssuance = 'CARD_ISSUANCE',
  ManualExit = 'MANUAL_EXIT',
  NonPayment = 'NON_PAYMENT',
  Subscription = 'SUBSCRIPTION',
  Traffic = 'TRAFFIC'
}

export enum E_TransactionType {
  CardToCard = 'CARD_TO_CARD',
  Cash = 'CASH',
  Pos = 'POS'
}

export enum E_UpdateParkingOperation {
  Decrease = 'DECREASE',
  Increase = 'INCREASE'
}

export type EditBlockedCarRq = {
  description?: InputMaybe<Scalars['String']['input']>;
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  submit_date?: InputMaybe<Scalars['DateTime']['input']>;
  token: Scalars['String']['input'];
};

export type EditCardRq = {
  card_number?: InputMaybe<Scalars['String']['input']>;
  csn?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<E_CardType>;
};

export type EditClientRq = {
  controller_token?: InputMaybe<Scalars['String']['input']>;
  driver_cam_token?: InputMaybe<Scalars['String']['input']>;
  ip_address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  plate_cam_token?: InputMaybe<Scalars['String']['input']>;
  pos_token?: InputMaybe<Scalars['String']['input']>;
  reader_token?: InputMaybe<Scalars['String']['input']>;
  relay_token?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<E_ClientType>;
};

export type EditCustomerRq = {
  apb?: InputMaybe<Scalars['Boolean']['input']>;
  daily_limit?: InputMaybe<Scalars['Int']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  monthly_limit?: InputMaybe<Scalars['Int']['input']>;
  plate_disable?: InputMaybe<Scalars['Boolean']['input']>;
  plate_serial1?: InputMaybe<Scalars['String']['input']>;
  plate_serial2?: InputMaybe<Scalars['String']['input']>;
  plate_serial3?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type EditDeviceRq = {
  brand_name?: InputMaybe<Scalars['String']['input']>;
  ip?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<E_DeviceType>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type EditDiscountRq = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  daily_limit?: InputMaybe<Scalars['Float']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type?: InputMaybe<E_DiscountType>;
};

export type EditGroupRq = {
  credit?: InputMaybe<CreditSettingsInput>;
  daily?: InputMaybe<DailyRateInput>;
  daily_rates?: InputMaybe<DailyRatesInput>;
  free_entry_duration?: InputMaybe<Scalars['Float']['input']>;
  free_exit_duration?: InputMaybe<Scalars['Float']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  type: E_GroupType;
};

export type EditInactiveCarRq = {
  description?: InputMaybe<Scalars['String']['input']>;
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  submit_date?: InputMaybe<Scalars['DateTime']['input']>;
  token: Scalars['String']['input'];
};

export type EditPosRq = {
  ip?: InputMaybe<Scalars['String']['input']>;
  num?: InputMaybe<Scalars['Float']['input']>;
  terminal?: InputMaybe<Scalars['Float']['input']>;
  token: Scalars['String']['input'];
};

export type EditUserRq = {
  expiration_date?: InputMaybe<Scalars['DateTime']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  manual_exit_daily_limit?: InputMaybe<Scalars['Float']['input']>;
  manual_exit_monthly_limit?: InputMaybe<Scalars['Float']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  rate_limit?: InputMaybe<Scalars['Float']['input']>;
  role_token?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type FetchActiveTrafficsByCardRq = {
  card_number: Scalars['String']['input'];
};

export type FetchActiveTrafficsByPlateRq = {
  plate_serial: Scalars['String']['input'];
};

export type FetchActiveTrafficsRs = {
  card_number: Scalars['String']['output'];
  entrance: Scalars['DateTime']['output'];
  entrance_driver_image?: Maybe<Scalars['String']['output']>;
  entrance_plate_image?: Maybe<Scalars['String']['output']>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type FetchAlFundsRq = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
};

export type FetchAllFundsRs = {
  count: Scalars['Float']['output'];
  items: Array<Fund>;
};

export type FetchCardByCsnRq = {
  card_csn: Scalars['String']['input'];
};

export type FetchCardsRq = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FetchCardsRs = {
  count: Scalars['Float']['output'];
  items: Array<Card>;
};

export type FetchClientByIpRq = {
  ip: Scalars['String']['input'];
};

export type FetchCreditCardsRq = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FetchCurrentUserFundsRq = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
};

export type FetchCurrentUserFundsRs = {
  count: Scalars['Float']['output'];
  items: Array<Fund>;
};

export type FetchCustomerByCardSearchRq = {
  search: Scalars['String']['input'];
};

export type FetchCustomerLastEntranceRq = {
  customer_token: Scalars['String']['input'];
};

export type FetchCustomersRq = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type FetchDiscountsRs = {
  discount: Discount;
  has_discount_code: Scalars['Boolean']['output'];
};

export type FetchLastFiveEntranceTrafficsRs = {
  card_number: Scalars['String']['output'];
  entrance: Scalars['DateTime']['output'];
  exit?: Maybe<Scalars['DateTime']['output']>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type FetchLastFiveExitTrafficsRs = {
  card_number: Scalars['String']['output'];
  entrance: Scalars['DateTime']['output'];
  exit?: Maybe<Scalars['DateTime']['output']>;
  paid_amount?: Maybe<Scalars['Float']['output']>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type FetchRoleByTokenRq = {
  token: Scalars['String']['input'];
};

export type FetchSessionsRq = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type FetchSessionsRs = {
  count: Scalars['Float']['output'];
  items: Array<Session>;
};

export type FetchTrafficByTokenRq = {
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

export type Fund = {
  card_to_card_income: Scalars['Float']['output'];
  cash_income: Scalars['Float']['output'];
  created_by: User;
  description?: Maybe<Scalars['String']['output']>;
  issue_date: Scalars['String']['output'];
  manual_pos?: Maybe<Array<Pos>>;
  pos_income?: Maybe<Scalars['Float']['output']>;
  supervisor: User;
  system_pos: Pos;
  token: Scalars['String']['output'];
};

export type Group = {
  created_at: Scalars['DateTime']['output'];
  credit?: Maybe<CreditSettings>;
  daily?: Maybe<DailyRate>;
  daily_rates?: Maybe<DailyRates>;
  free_entry_duration?: Maybe<Scalars['Float']['output']>;
  free_exit_duration?: Maybe<Scalars['Float']['output']>;
  tax: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  token: Scalars['String']['output'];
  type: E_GroupType;
};

export type HourlyIncome = {
  hour_range: Scalars['String']['output'];
  income: Scalars['Float']['output'];
};

export type HourlyTrafficData = {
  entrance: Scalars['Float']['output'];
  exit: Scalars['Float']['output'];
};

export type InactiveCar = {
  description: Scalars['String']['output'];
  plate_serial: Scalars['String']['output'];
  submit_date: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type MissedItem = {
  card_number: Scalars['String']['output'];
  end: Scalars['DateTime']['output'];
  entrance_image?: Maybe<Scalars['String']['output']>;
  entrance_user_fullname: Scalars['String']['output'];
  exit_image?: Maybe<Scalars['String']['output']>;
  exit_user_fullname: Scalars['String']['output'];
  group_title: Scalars['String']['output'];
  missed_amount: Scalars['Float']['output'];
  parking_amount: Scalars['Float']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
  start: Scalars['DateTime']['output'];
};

export type Mutation = {
  addBlockedCar: Scalars['Boolean']['output'];
  addInactiveCar: Scalars['Boolean']['output'];
  addOffDay: Scalars['Boolean']['output'];
  bulkCreateCards: Scalars['Boolean']['output'];
  calculateGroupPrice: Scalars['Float']['output'];
  calculateGroupPriceOld: Scalars['Float']['output'];
  createBackup: Scalars['Boolean']['output'];
  createCard: Scalars['Boolean']['output'];
  createCardIssuanceTx: Scalars['String']['output'];
  createClient: Scalars['Boolean']['output'];
  createCustomer: Scalars['Boolean']['output'];
  createCustomerDesktop: Customer;
  createDevice: Scalars['Boolean']['output'];
  createDiscount: Scalars['Boolean']['output'];
  createDiscountCodes: Scalars['Boolean']['output'];
  createGroup: Scalars['Boolean']['output'];
  createNewRole: Scalars['Boolean']['output'];
  createPOS: Scalars['Boolean']['output'];
  createSubTx: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteBlockedCar: Scalars['Boolean']['output'];
  deleteClient: Scalars['Boolean']['output'];
  deleteInactiveCar: Scalars['Boolean']['output'];
  deleteOffDay: Scalars['Boolean']['output'];
  downloadDiscountCodes: DownloadDiscountCodesRs;
  editBlockedCar: Scalars['Boolean']['output'];
  editCard: Scalars['Boolean']['output'];
  editClient: Scalars['Boolean']['output'];
  editCustomer: Scalars['Boolean']['output'];
  editDevice: Scalars['Boolean']['output'];
  editDiscount: Scalars['Boolean']['output'];
  editGroup: Scalars['Boolean']['output'];
  editInactiveCar: Scalars['Boolean']['output'];
  editPOS: Scalars['Boolean']['output'];
  editUser: Scalars['Boolean']['output'];
  exportReportCustomerAverage: DownloadReportRs;
  exportReportCustomerExpired: DownloadReportRs;
  exportReportCustomerExtend: DownloadReportRs;
  exportReportCustomerLog: DownloadReportRs;
  exportReportDiscountManualExit: DownloadReportRs;
  exportReportDiscountUsage: DownloadReportRs;
  exportReportFinancialComparingIncomes: DownloadReportRs;
  exportReportFinancialDailyFund: DownloadReportRs;
  exportReportFinancialDailyIncome: DownloadReportRs;
  exportReportFinancialDailySummary: DownloadReportRs;
  exportReportFinancialHourlyIncome: DownloadReportRs;
  exportReportFinancialIncomeChart: DownloadReportRs;
  exportReportFinancialMissed: DownloadReportRs;
  exportReportFinancialNonPayment: DownloadReportRs;
  exportReportFinancialPaymentsChart: DownloadReportRs;
  exportReportFinancialTransactions: DownloadReportRs;
  exportReportTrafficAverage: DownloadReportRs;
  exportReportTrafficComprehensiveEntranceExit: DownloadReportRs;
  exportReportTrafficInactiveCars: DownloadReportRs;
  exportReportTrafficList: DownloadReportRs;
  exportReportTrafficWithDiscount: DownloadReportRs;
  exportReportTrafficWithoutPlate: DownloadReportRs;
  exportReportUserActivity: DownloadReportRs;
  exportReportUserPerformance: DownloadReportRs;
  exportReportUserPresence: DownloadReportRs;
  restoreBackup: Scalars['Boolean']['output'];
  searchCashTrafficByPlate: Scalars['String']['output'];
  searchCustomersByPlate: Customer;
  submitCustomerEntrance: Scalars['String']['output'];
  submitEditedPlateTraffic: Scalars['Boolean']['output'];
  submitExtraTrafficTx: Scalars['Boolean']['output'];
  submitFundDesktop: Scalars['String']['output'];
  submitFundUserAction: Scalars['Boolean']['output'];
  submitMissedCardTraffic: Scalars['Boolean']['output'];
  submitNonPaymentTraffic: Scalars['Boolean']['output'];
  submitTrafficDiscount: Scalars['Boolean']['output'];
  submitTrafficEntrance: Scalars['String']['output'];
  submitTrafficExit: Scalars['String']['output'];
  submitTrafficTemporalExit: Scalars['Boolean']['output'];
  submitTrafficTx: Scalars['Boolean']['output'];
  toggleCardStatus: Scalars['Boolean']['output'];
  toggleCustomerStatus: Scalars['Boolean']['output'];
  toggleDiscountStatus: Scalars['Boolean']['output'];
  toggleUserStatus: Scalars['Boolean']['output'];
  unassignCustomerCard: Scalars['Boolean']['output'];
  unblockCar: Scalars['Boolean']['output'];
  unlinkPath: Scalars['Boolean']['output'];
  updateCustomerSub: Scalars['Boolean']['output'];
  updateDefaultCashGroup: Scalars['Boolean']['output'];
  updateFund: Scalars['Boolean']['output'];
  updateGroupInfo: Scalars['Boolean']['output'];
  updateParkingInfo: Scalars['Boolean']['output'];
  updateParkingOccupied: Scalars['Boolean']['output'];
  updateRole: Scalars['Boolean']['output'];
  updateUserRole: Scalars['Boolean']['output'];
  useDiscountCode: Scalars['Boolean']['output'];
  userLogin: Scalars['String']['output'];
  userLoginDesktop: Scalars['String']['output'];
  userLogoutDesktop: Scalars['Boolean']['output'];
};


export type MutationAddBlockedCarArgs = {
  body: AddBlockedCarRq;
};


export type MutationAddInactiveCarArgs = {
  body: AddInactiveCarRq;
};


export type MutationAddOffDayArgs = {
  body: AddOffDayRq;
};


export type MutationBulkCreateCardsArgs = {
  body: BulkCreateCardsRq;
};


export type MutationCalculateGroupPriceArgs = {
  body: CalculateGroupPriceRq;
};


export type MutationCalculateGroupPriceOldArgs = {
  body: CalculateGroupPriceRq;
};


export type MutationCreateCardArgs = {
  body: CreateCardRq;
};


export type MutationCreateCardIssuanceTxArgs = {
  body: CreateCardIssuanceTxRq;
};


export type MutationCreateClientArgs = {
  body: CreateClientRq;
};


export type MutationCreateCustomerArgs = {
  body: CreateCustomerRq;
};


export type MutationCreateCustomerDesktopArgs = {
  body: CreateCustomerDesktopRq;
};


export type MutationCreateDeviceArgs = {
  body: CreateDeviceRq;
};


export type MutationCreateDiscountArgs = {
  body: CreateDiscountRq;
};


export type MutationCreateDiscountCodesArgs = {
  body: CreateDiscountCodesRq;
};


export type MutationCreateGroupArgs = {
  body: CreateGroupRq;
};


export type MutationCreateNewRoleArgs = {
  body: CreateNewRoleRq;
};


export type MutationCreatePosArgs = {
  body: CreatePosRq;
};


export type MutationCreateSubTxArgs = {
  body: CreateSubTxRq;
};


export type MutationCreateUserArgs = {
  body: CreateUserRq;
};


export type MutationDeleteBlockedCarArgs = {
  body: DeleteBlockedCarRq;
};


export type MutationDeleteClientArgs = {
  body: DeleteClientRq;
};


export type MutationDeleteInactiveCarArgs = {
  body: DeleteInactiveCarRq;
};


export type MutationDeleteOffDayArgs = {
  body: DeleteOffDayRq;
};


export type MutationDownloadDiscountCodesArgs = {
  body: DownloadDiscountCodesRq;
};


export type MutationEditBlockedCarArgs = {
  body: EditBlockedCarRq;
};


export type MutationEditCardArgs = {
  body: EditCardRq;
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


export type MutationEditDiscountArgs = {
  body: EditDiscountRq;
};


export type MutationEditGroupArgs = {
  body: EditGroupRq;
};


export type MutationEditInactiveCarArgs = {
  body: EditInactiveCarRq;
};


export type MutationEditPosArgs = {
  body: EditPosRq;
};


export type MutationEditUserArgs = {
  body: EditUserRq;
};


export type MutationExportReportCustomerAverageArgs = {
  body: ReportCustomerAverageRq;
};


export type MutationExportReportCustomerExpiredArgs = {
  body: ReportCustomerExpiredRq;
};


export type MutationExportReportCustomerExtendArgs = {
  body: ReportCustomerExtendRq;
};


export type MutationExportReportCustomerLogArgs = {
  body: ReportCustomerLogRq;
};


export type MutationExportReportFinancialComparingIncomesArgs = {
  body: ReportFinancialComparingIncomesChartRq;
};


export type MutationExportReportFinancialDailyFundArgs = {
  body: ReportFinancialDailyFundRq;
};


export type MutationExportReportFinancialDailyIncomeArgs = {
  body: ReportFinancialDailyIncomeRq;
};


export type MutationExportReportFinancialDailySummaryArgs = {
  body: ReportFinancialDailySummaryRq;
};


export type MutationExportReportFinancialHourlyIncomeArgs = {
  body: ReportFinancialHourlyIncomeRq;
};


export type MutationExportReportFinancialIncomeChartArgs = {
  body: ReportFinancialIncomeChartRq;
};


export type MutationExportReportFinancialMissedArgs = {
  body: ReportFinancialMissedRq;
};


export type MutationExportReportFinancialNonPaymentArgs = {
  body: ReportFinancialNonPaymentRq;
};


export type MutationExportReportFinancialPaymentsChartArgs = {
  body: ReportFinancialPaymentsChartRq;
};


export type MutationExportReportFinancialTransactionsArgs = {
  body: ReportFinancialTransactionsRq;
};


export type MutationExportReportTrafficAverageArgs = {
  body: ReportTrafficAverageRq;
};


export type MutationExportReportTrafficComprehensiveEntranceExitArgs = {
  body: ReportTrafficComprehensiveEntranceExitRq;
};


export type MutationExportReportTrafficInactiveCarsArgs = {
  body: ReportTrafficInactiveCarsRq;
};


export type MutationExportReportTrafficListArgs = {
  body: ReportTrafficListRq;
};


export type MutationExportReportTrafficWithoutPlateArgs = {
  body: ReportTrafficWithoutPlateRq;
};


export type MutationExportReportUserActivityArgs = {
  body: ReportUserActivityRq;
};


export type MutationExportReportUserPerformanceArgs = {
  body: ReportUserPerformanceRq;
};


export type MutationExportReportUserPresenceArgs = {
  body: ReportUserPresenceRq;
};


export type MutationRestoreBackupArgs = {
  body: RestoreBackupRq;
};


export type MutationSearchCashTrafficByPlateArgs = {
  body: SearchByPlateRq;
};


export type MutationSearchCustomersByPlateArgs = {
  body: SearchByPlateRq;
};


export type MutationSubmitCustomerEntranceArgs = {
  body: SubmitCustomerEntranceRq;
};


export type MutationSubmitEditedPlateTrafficArgs = {
  body: SubmitEditedPlateTrafficRq;
};


export type MutationSubmitExtraTrafficTxArgs = {
  body: SubmitExtraTrafficTxRq;
};


export type MutationSubmitFundDesktopArgs = {
  body: SubmitFundUserActionRq;
};


export type MutationSubmitFundUserActionArgs = {
  body: SubmitFundUserActionRq;
};


export type MutationSubmitMissedCardTrafficArgs = {
  body: SubmitMissedCardTrafficRq;
};


export type MutationSubmitNonPaymentTrafficArgs = {
  body: SubmitNonPaymentTrafficTxRq;
};


export type MutationSubmitTrafficDiscountArgs = {
  body: SubmitTrafficDiscountRq;
};


export type MutationSubmitTrafficEntranceArgs = {
  body: SubmitTrafficEntranceRq;
};


export type MutationSubmitTrafficExitArgs = {
  body: SubmitTrafficExitRq;
};


export type MutationSubmitTrafficTemporalExitArgs = {
  body: SubmitTrafficTemporalExitRq;
};


export type MutationSubmitTrafficTxArgs = {
  body: SubmitTrafficTxRq;
};


export type MutationToggleCardStatusArgs = {
  body: ToggleCardStatusRq;
};


export type MutationToggleCustomerStatusArgs = {
  body: ToggleCustomerStatusRq;
};


export type MutationToggleDiscountStatusArgs = {
  body: ToggleCardStatusRq;
};


export type MutationToggleUserStatusArgs = {
  body: ToggleUserStatus;
};


export type MutationUnassignCustomerCardArgs = {
  body: UnassignCustomerCardRq;
};


export type MutationUnblockCarArgs = {
  body: UnblockCarRq;
};


export type MutationUnlinkPathArgs = {
  path: Scalars['String']['input'];
};


export type MutationUpdateCustomerSubArgs = {
  body: UpdateCustomerSubRq;
};


export type MutationUpdateDefaultCashGroupArgs = {
  body: UpdateDefaultCashGroupRq;
};


export type MutationUpdateFundArgs = {
  body: UpdateFundRq;
};


export type MutationUpdateGroupInfoArgs = {
  body: UpdateGroupInfoRq;
};


export type MutationUpdateParkingInfoArgs = {
  body: UpdateParkingInfoRq;
};


export type MutationUpdateParkingOccupiedArgs = {
  body: UpdateParkingOccupiedRq;
};


export type MutationUpdateRoleArgs = {
  body: UpdateRoleRq;
};


export type MutationUpdateUserRoleArgs = {
  body: UpdateUserRoleRq;
};


export type MutationUseDiscountCodeArgs = {
  body: UseDiscountCodeRq;
};


export type MutationUserLoginArgs = {
  body: UserLoginRq;
};


export type MutationUserLoginDesktopArgs = {
  body: UserLoginDesktopRq;
};


export type MutationUserLogoutDesktopArgs = {
  body: UserLogoutDesktopRq;
};

export type NonPaymentItem = {
  amount: Scalars['Float']['output'];
  card_number: Scalars['String']['output'];
  end: Scalars['DateTime']['output'];
  entrance_image?: Maybe<Scalars['String']['output']>;
  entrance_user_fullname: Scalars['String']['output'];
  exit_image?: Maybe<Scalars['String']['output']>;
  exit_user_fullname: Scalars['String']['output'];
  group_title: Scalars['String']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
  start: Scalars['DateTime']['output'];
};

export type OffDay = {
  off_day: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Pos = {
  ip: Scalars['String']['output'];
  num: Scalars['Float']['output'];
  terminal: Scalars['Float']['output'];
  token: Scalars['String']['output'];
};

export type Parking = {
  capacity: Scalars['Float']['output'];
  card_issuance_fee: Scalars['Float']['output'];
  cash_adjustment: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  default_cash_group?: Maybe<Group>;
  in_traffic_count: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  occupied: Scalars['Float']['output'];
  out_traffic_count: Scalars['Float']['output'];
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
  checkCustomerByCardToken: CheckCustomerSubByCardTokenRs;
  currentUser: User;
  fetchActiveDiscounts: Array<FetchDiscountsRs>;
  fetchActiveTrafficsByCard: Array<FetchActiveTrafficsRs>;
  fetchActiveTrafficsByPlate: Array<FetchActiveTrafficsRs>;
  fetchActiveUsers: Array<User>;
  fetchAllFunds: FetchAllFundsRs;
  fetchBackups: Array<Backup>;
  fetchBlockedCars: Array<BlockedCar>;
  fetchCardByCsn: Card;
  fetchCards: FetchCardsRs;
  fetchCashAdjustment: Scalars['Float']['output'];
  fetchClientByIP: Client;
  fetchClients: Array<Client>;
  fetchCreditCards: FetchCardsRs;
  fetchCurrentUserFunds: FetchCurrentUserFundsRs;
  fetchCustomerByCardSearch: Customer;
  fetchCustomerLastEntrance: CustomerLog;
  fetchCustomers: Array<Customer>;
  fetchDevices: Array<Device>;
  fetchDiscounts: Array<FetchDiscountsRs>;
  fetchGroups: Array<Group>;
  fetchInactiveCars: Array<InactiveCar>;
  fetchLastFiveEntranceTraffics: Array<FetchLastFiveEntranceTrafficsRs>;
  fetchLastFiveExitTraffics: Array<FetchLastFiveExitTrafficsRs>;
  fetchOffDays: Array<OffDay>;
  fetchPOSList: Array<Pos>;
  fetchRoleByToken: Role;
  fetchRoles: Array<Role>;
  fetchSessions: FetchSessionsRs;
  fetchSupervisors: Array<User>;
  fetchSystemUsers: Array<User>;
  fetchTrafficByToken: Traffic;
  fetchUsersList: FetchUsersListRs;
  parkingInfo: Parking;
  pingAllDevices: Array<PingAllDevicesRs>;
  reportCustomerAverage: ReportCustomerAverageRs;
  reportCustomerExpired: ReportCustomerExpiredRs;
  reportCustomerExtend: ReportCustomerExtendRs;
  reportCustomerLog: ReportCustomerLogRs;
  reportCustomerTrafficChart: ReportCustomerTrafficChartRs;
  reportDiscountManualExit: ReportDiscountManualExitRs;
  reportDiscountUsage: ReportDiscountUsageRs;
  reportFinancialComparingIncomes: ReportFinancialComparingIncomesChartRs;
  reportFinancialDailyFund: Array<ReportFinancialDailyFundRs>;
  reportFinancialDailyIncome: ReportFinancialDailyIncomeRs;
  reportFinancialDailySummary: ReportFinancialDailySummaryRs;
  reportFinancialHourlyIncome: ReportFinancialHourlyIncomeRs;
  reportFinancialIncomeChart: ReportFinancialIncomeChartRs;
  reportFinancialMissed: ReportFinancialMissedRs;
  reportFinancialNonPayment: ReportFinancialNonPaymentRs;
  reportFinancialPaymentsChart: ReportFinancialPaymentsChartRs;
  reportFinancialSummary: Array<ReportFinancialSummaryRs>;
  reportFinancialTransactions: ReportFinancialTransactionsRs;
  reportTrafficAverage: ReportTrafficAverageRs;
  reportTrafficComprehensiveEntranceExit: ReportTrafficComprehensiveEntranceExitRs;
  reportTrafficEditedPlates: ReportTrafficEditedPlatesRs;
  reportTrafficExitEntranceChart: ReportTrafficExitEntranceChartRs;
  reportTrafficInactiveCars: ReportTrafficInactiveCarsRs;
  reportTrafficList: ReportTrafficListRs;
  reportTrafficPresenceChart: ReportTrafficPresenceChartRs;
  reportTrafficWithDiscount: ReportTrafficWithDiscountRs;
  reportTrafficWithoutPlate: ReportTrafficWithoutPlateRs;
  reportUserActivity: ReportUserActivityRs;
  reportUserPerformance: ReportUserPerformanceRs;
  reportUserPresence: ReportUserPresenceRs;
  searchCards: SearchCardsRs;
  searchUsersByFullname: Array<User>;
};


export type QueryCheckCustomerByCardTokenArgs = {
  body: CheckCustomerSubByCardTokenRq;
};


export type QueryFetchActiveTrafficsByCardArgs = {
  body: FetchActiveTrafficsByCardRq;
};


export type QueryFetchActiveTrafficsByPlateArgs = {
  body: FetchActiveTrafficsByPlateRq;
};


export type QueryFetchAllFundsArgs = {
  body: FetchAlFundsRq;
};


export type QueryFetchCardByCsnArgs = {
  body: FetchCardByCsnRq;
};


export type QueryFetchCardsArgs = {
  body: FetchCardsRq;
};


export type QueryFetchClientByIpArgs = {
  body: FetchClientByIpRq;
};


export type QueryFetchCreditCardsArgs = {
  body: FetchCreditCardsRq;
};


export type QueryFetchCurrentUserFundsArgs = {
  body: FetchCurrentUserFundsRq;
};


export type QueryFetchCustomerByCardSearchArgs = {
  body: FetchCustomerByCardSearchRq;
};


export type QueryFetchCustomerLastEntranceArgs = {
  body: FetchCustomerLastEntranceRq;
};


export type QueryFetchCustomersArgs = {
  body: FetchCustomersRq;
};


export type QueryFetchRoleByTokenArgs = {
  body: FetchRoleByTokenRq;
};


export type QueryFetchSessionsArgs = {
  body: FetchSessionsRq;
};


export type QueryFetchTrafficByTokenArgs = {
  body: FetchTrafficByTokenRq;
};


export type QueryFetchUsersListArgs = {
  body: FetchUsersListRq;
};


export type QueryReportCustomerAverageArgs = {
  body: ReportCustomerAverageRq;
};


export type QueryReportCustomerExpiredArgs = {
  body: ReportCustomerExpiredRq;
};


export type QueryReportCustomerExtendArgs = {
  body: ReportCustomerExtendRq;
};


export type QueryReportCustomerLogArgs = {
  body: ReportCustomerLogRq;
};


export type QueryReportCustomerTrafficChartArgs = {
  body: ReportCustomerTrafficChartRq;
};


export type QueryReportDiscountManualExitArgs = {
  body: ReportDiscountManualExitRq;
};


export type QueryReportDiscountUsageArgs = {
  body: ReportDiscountUsageRq;
};


export type QueryReportFinancialComparingIncomesArgs = {
  body: ReportFinancialComparingIncomesChartRq;
};


export type QueryReportFinancialDailyFundArgs = {
  body: ReportFinancialDailyFundRq;
};


export type QueryReportFinancialDailyIncomeArgs = {
  body: ReportFinancialDailyIncomeRq;
};


export type QueryReportFinancialDailySummaryArgs = {
  body: ReportFinancialDailySummaryRq;
};


export type QueryReportFinancialHourlyIncomeArgs = {
  body: ReportFinancialHourlyIncomeRq;
};


export type QueryReportFinancialIncomeChartArgs = {
  body: ReportFinancialIncomeChartRq;
};


export type QueryReportFinancialMissedArgs = {
  body: ReportFinancialMissedRq;
};


export type QueryReportFinancialNonPaymentArgs = {
  body: ReportFinancialNonPaymentRq;
};


export type QueryReportFinancialPaymentsChartArgs = {
  body: ReportFinancialPaymentsChartRq;
};


export type QueryReportFinancialSummaryArgs = {
  body: ReportFinancialSummaryRq;
};


export type QueryReportFinancialTransactionsArgs = {
  body: ReportFinancialTransactionsRq;
};


export type QueryReportTrafficAverageArgs = {
  body: ReportTrafficAverageRq;
};


export type QueryReportTrafficComprehensiveEntranceExitArgs = {
  body: ReportTrafficComprehensiveEntranceExitRq;
};


export type QueryReportTrafficEditedPlatesArgs = {
  body: ReportTrafficEditedPlatesRq;
};


export type QueryReportTrafficExitEntranceChartArgs = {
  body: ReportTrafficExitEntranceChartRq;
};


export type QueryReportTrafficInactiveCarsArgs = {
  body: ReportTrafficInactiveCarsRq;
};


export type QueryReportTrafficListArgs = {
  body: ReportTrafficListRq;
};


export type QueryReportTrafficPresenceChartArgs = {
  body: ReportTrafficPresenceChartRq;
};


export type QueryReportTrafficWithDiscountArgs = {
  body: ReportTrafficWithDiscountRq;
};


export type QueryReportTrafficWithoutPlateArgs = {
  body: ReportTrafficWithoutPlateRq;
};


export type QueryReportUserActivityArgs = {
  body: ReportUserActivityRq;
};


export type QueryReportUserPerformanceArgs = {
  body: ReportUserPerformanceRq;
};


export type QueryReportUserPresenceArgs = {
  body: ReportUserPresenceRq;
};


export type QuerySearchCardsArgs = {
  body: SearchCardsRq;
};


export type QuerySearchUsersByFullnameArgs = {
  body: SearchUsersByFullnameRq;
};

export type ReportCustomerAverageRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportCustomerAverageRs = {
  avg_presence_in_ms: Scalars['Float']['output'];
  avg_traffic: Scalars['Float']['output'];
  items: Array<TrafficAverageItem>;
};

export type ReportCustomerExpiredRq = {
  card_token?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
};

export type ReportCustomerExpiredRs = {
  count: Scalars['Float']['output'];
  items: Array<CustomerExpiredItem>;
};

export type ReportCustomerExtendRq = {
  card_token?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
};

export type ReportCustomerExtendRs = {
  count: Scalars['Float']['output'];
  items: Array<CustomerExtendItem>;
};

export type ReportCustomerLogRq = {
  card_token?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportCustomerLogRs = {
  count: Scalars['Float']['output'];
  items: Array<CustomerLogItem>;
};

export type ReportCustomerTrafficChartRq = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportCustomerTrafficChartRs = {
  invalid_entrance_count: Scalars['Float']['output'];
  invalid_exit_count: Scalars['Float']['output'];
  valid_entrance_count: Scalars['Float']['output'];
  valid_exit_count: Scalars['Float']['output'];
};

export type ReportDiscountManualExitRq = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type ReportDiscountManualExitRs = {
  count: Scalars['Float']['output'];
  items: Array<DiscountManualExitItem>;
};

export type ReportDiscountUsageRq = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type ReportDiscountUsageRs = {
  count: Scalars['Float']['output'];
  items: Array<DiscountUsageItem>;
};

export type ReportFinancialComparingIncomesChartRq = {
  duration: Scalars['Float']['input'];
  start_date1: Scalars['DateTime']['input'];
  start_date2: Scalars['DateTime']['input'];
};

export type ReportFinancialComparingIncomesChartRs = {
  incomes: Array<ComparingIncomes>;
};

export type ReportFinancialDailyFundRq = {
  date: Scalars['DateTime']['input'];
};

export type ReportFinancialDailyFundRs = {
  card_income: Scalars['Float']['output'];
  card_to_card_income: Scalars['Float']['output'];
  cash_income: Scalars['Float']['output'];
  credit_income: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  offset: Scalars['Float']['output'];
  pos_income: Scalars['Float']['output'];
  total_income: Scalars['Float']['output'];
  traffic_income: Scalars['Float']['output'];
  user_fullname: Scalars['String']['output'];
};

export type ReportFinancialDailyIncomeRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportFinancialDailyIncomeRs = {
  daily_incomes: Array<DailyIncomeItem>;
};

export type ReportFinancialDailySummaryItem = {
  card_to_card_amount: Scalars['Float']['output'];
  cash_amount: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  discount_amount: Scalars['Float']['output'];
  initial_amount: Scalars['Float']['output'];
  missed_amount: Scalars['Float']['output'];
  non_payment_amount: Scalars['Float']['output'];
  paid_amount: Scalars['Float']['output'];
  pos_amount: Scalars['Float']['output'];
};

export type ReportFinancialDailySummaryRq = {
  end_date: Scalars['DateTime']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  start_date: Scalars['DateTime']['input'];
  user_token: Scalars['String']['input'];
};

export type ReportFinancialDailySummaryRs = {
  count: Scalars['Float']['output'];
  items: Array<ReportFinancialDailySummaryItem>;
};

export type ReportFinancialHourlyIncomeRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportFinancialHourlyIncomeRs = {
  daily_incomes: Array<DailyHourlyIncome>;
};

export type ReportFinancialIncomeChartRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportFinancialIncomeChartRs = {
  daily_incomes: Array<DailyIncome>;
};

export type ReportFinancialMissedRq = {
  card_number?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportFinancialMissedRs = {
  count: Scalars['Float']['output'];
  items: Array<MissedItem>;
};

export type ReportFinancialNonPaymentRq = {
  card_token?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportFinancialNonPaymentRs = {
  count: Scalars['Float']['output'];
  items: Array<NonPaymentItem>;
};

export type ReportFinancialPaymentsChartRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportFinancialPaymentsChartRs = {
  card_to_card: Scalars['Float']['output'];
  cash: Scalars['Float']['output'];
  missed: Scalars['Float']['output'];
  non_payment: Scalars['Float']['output'];
  pos: Scalars['Float']['output'];
  used_discounts: Scalars['Float']['output'];
};

export type ReportFinancialSummaryRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportFinancialSummaryRs = {
  card_to_card_amount: Scalars['Float']['output'];
  cash_amount: Scalars['Float']['output'];
  discount_amount: Scalars['Float']['output'];
  initial_amount: Scalars['Float']['output'];
  missed_amount: Scalars['Float']['output'];
  non_payment_amount: Scalars['Float']['output'];
  paid_amount: Scalars['Float']['output'];
  pos_amount: Scalars['Float']['output'];
  user_fullname: Scalars['String']['output'];
  user_token: Scalars['String']['output'];
};

export type ReportFinancialTransactionsRq = {
  end?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['DateTime']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportFinancialTransactionsRs = {
  count: Scalars['Float']['output'];
  items: Array<TransactionItem>;
};

export type ReportTrafficAverageRq = {
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportTrafficAverageRs = {
  avg_presence_in_ms: Scalars['Float']['output'];
  avg_traffic: Scalars['Float']['output'];
  items: Array<TrafficAverageItem>;
};

export type ReportTrafficComprehensiveEntranceExitRq = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
  type?: InputMaybe<E_ClientType>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportTrafficComprehensiveEntranceExitRs = {
  stats: Array<ClientTrafficStats>;
};

export type ReportTrafficEditedPlatesRq = {
  card_number_token?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportTrafficEditedPlatesRs = {
  count: Scalars['Float']['output'];
  items: Array<TrafficEditedPlateItem>;
};

export type ReportTrafficExitEntranceChartRq = {
  display_method: E_DisplayMethod;
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportTrafficExitEntranceChartRs = {
  buckets: Array<TrafficExitEntranceBucket>;
  totalEntrances: Scalars['Float']['output'];
  totalExits: Scalars['Float']['output'];
};

export type ReportTrafficInactiveCarsRq = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportTrafficInactiveCarsRs = {
  count: Scalars['Float']['output'];
  items: Array<TrafficInactiveCar>;
};

export type ReportTrafficListItem = {
  card_number: Scalars['String']['output'];
  entrance: Scalars['DateTime']['output'];
  entrance_image?: Maybe<Scalars['String']['output']>;
  entrance_user_fullname: Scalars['String']['output'];
  exit?: Maybe<Scalars['DateTime']['output']>;
  exit_image?: Maybe<Scalars['String']['output']>;
  exit_user_fullname?: Maybe<Scalars['String']['output']>;
  group_title: Scalars['String']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
  presence_duration?: Maybe<Scalars['Float']['output']>;
};

export type ReportTrafficListRq = {
  card_number_token?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  entrance_user_token?: InputMaybe<Scalars['String']['input']>;
  exit_user_token?: InputMaybe<Scalars['String']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  max_presence_duration?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Int']['input'];
  plate_serial?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportTrafficListRs = {
  count: Scalars['Float']['output'];
  items: Array<ReportTrafficListItem>;
};

export type ReportTrafficPresenceChartRq = {
  display_method: E_DisplayMethod;
  end_date: Scalars['DateTime']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type ReportTrafficPresenceChartRs = {
  buckets: Array<TrafficPresenceBucket>;
  total: Scalars['Float']['output'];
};

export type ReportTrafficWithDiscountRq = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type ReportTrafficWithDiscountRs = {
  count: Scalars['Float']['output'];
  items: Array<TrafficWithDiscountItem>;
};

export type ReportTrafficWithoutPlateItem = {
  card_number: Scalars['String']['output'];
  entrance: Scalars['DateTime']['output'];
  entrance_image?: Maybe<Scalars['String']['output']>;
  entrance_user_fullname: Scalars['String']['output'];
  exit?: Maybe<Scalars['DateTime']['output']>;
  exit_image?: Maybe<Scalars['String']['output']>;
  exit_user_fullname?: Maybe<Scalars['String']['output']>;
  group_title: Scalars['String']['output'];
};

export type ReportTrafficWithoutPlateRq = {
  card_number_token?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  entrance_user_token?: InputMaybe<Scalars['String']['input']>;
  exit_user_token?: InputMaybe<Scalars['String']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReportTrafficWithoutPlateRs = {
  count: Scalars['Float']['output'];
  items: Array<ReportTrafficWithoutPlateItem>;
};

export type ReportUserActivityItem = {
  first_traffic?: Maybe<Scalars['DateTime']['output']>;
  fullname: Scalars['String']['output'];
  last_traffic?: Maybe<Scalars['DateTime']['output']>;
  start: Scalars['DateTime']['output'];
};

export type ReportUserActivityRq = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportUserActivityRs = {
  count: Scalars['Float']['output'];
  items: Array<ReportUserActivityItem>;
};

export type ReportUserPerformanceItem = {
  discount_amount: Scalars['Float']['output'];
  discount_count: Scalars['Float']['output'];
  fullname: Scalars['String']['output'];
  missed_amount: Scalars['Float']['output'];
  missed_count: Scalars['Float']['output'];
  non_payment_amount: Scalars['Float']['output'];
  non_payment_count: Scalars['Float']['output'];
  traffic_amount: Scalars['Float']['output'];
  traffic_count: Scalars['Float']['output'];
};

export type ReportUserPerformanceRq = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportUserPerformanceRs = {
  count: Scalars['Float']['output'];
  items: Array<ReportUserPerformanceItem>;
};

export type ReportUserPresenceItem = {
  end?: Maybe<Scalars['DateTime']['output']>;
  fullname: Scalars['String']['output'];
  start: Scalars['DateTime']['output'];
};

export type ReportUserPresenceRq = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  user_token?: InputMaybe<Scalars['String']['input']>;
};

export type ReportUserPresenceRs = {
  count: Scalars['Float']['output'];
  items: Array<ReportUserPresenceItem>;
};

export type RestoreBackupRq = {
  token: Scalars['String']['input'];
};

export type Role = {
  is_default: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  token: Scalars['String']['output'];
};

export type SearchByPlateRq = {
  plate_serial: Scalars['String']['input'];
};

export type SearchCardsRq = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type SearchCardsRs = {
  count: Scalars['Float']['output'];
  items: Array<Card>;
};

export type SearchUsersByFullnameRq = {
  search: Scalars['String']['input'];
};

export type Session = {
  client?: Maybe<Client>;
  end?: Maybe<Scalars['DateTime']['output']>;
  fund?: Maybe<Fund>;
  is_active: Scalars['Boolean']['output'];
  start: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type SubmitCustomerEntranceRq = {
  card_token: Scalars['String']['input'];
  customer_token: Scalars['String']['input'];
  driver_image?: InputMaybe<Scalars['String']['input']>;
  plate_image?: InputMaybe<Scalars['String']['input']>;
  plate_serial?: InputMaybe<Scalars['String']['input']>;
};

export type SubmitEditedPlateTrafficRq = {
  edited_plate: Scalars['String']['input'];
  traffic_token: Scalars['String']['input'];
};

export type SubmitExtraTrafficTxRq = {
  card_to_card_amount: Scalars['Float']['input'];
  cash_amount: Scalars['Float']['input'];
  is_non_payment?: InputMaybe<Scalars['Boolean']['input']>;
  method: E_TransactionType;
  pos_amount: Scalars['Float']['input'];
  tax_amount: Scalars['Float']['input'];
  token: Scalars['String']['input'];
};

export type SubmitFundUserActionRq = {
  card_to_card_income: Scalars['Float']['input'];
  cash_income: Scalars['Float']['input'];
  created_by_token?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  issue_date: Scalars['DateTime']['input'];
  manual_pos_tokens?: InputMaybe<Array<Scalars['String']['input']>>;
  pos_income?: InputMaybe<Scalars['Float']['input']>;
  supervisor_token: Scalars['String']['input'];
  system_pos_token: Scalars['String']['input'];
};

export type SubmitMissedCardTrafficRq = {
  traffic_amount: Scalars['Float']['input'];
  traffic_token: Scalars['String']['input'];
};

export type SubmitNonPaymentTrafficTxRq = {
  amount: Scalars['Float']['input'];
  token: Scalars['String']['input'];
};

export type SubmitTrafficDiscountRq = {
  discount_code?: InputMaybe<Scalars['String']['input']>;
  discount_token: Scalars['String']['input'];
  traffic_token: Scalars['String']['input'];
};

export type SubmitTrafficEntranceRq = {
  card_token: Scalars['String']['input'];
  driver_image?: InputMaybe<Scalars['String']['input']>;
  plate_image?: InputMaybe<Scalars['String']['input']>;
  plate_serial?: InputMaybe<Scalars['String']['input']>;
};

export type SubmitTrafficExitRq = {
  card_token: Scalars['String']['input'];
  driver_image?: InputMaybe<Scalars['String']['input']>;
  plate_image?: InputMaybe<Scalars['String']['input']>;
};

export type SubmitTrafficTemporalExitRq = {
  amount: Scalars['Float']['input'];
  traffic_token: Scalars['String']['input'];
  type: E_TemporalExitType;
};

export type SubmitTrafficTxRq = {
  card_to_card_amount: Scalars['Float']['input'];
  cash_amount: Scalars['Float']['input'];
  discount_amount: Scalars['Float']['input'];
  is_non_payment?: InputMaybe<Scalars['Boolean']['input']>;
  manual_exit_amount?: InputMaybe<Scalars['Float']['input']>;
  method: E_TransactionType;
  pos_amount: Scalars['Float']['input'];
  tax_amount: Scalars['Float']['input'];
  token: Scalars['String']['input'];
};

export type ToggleCardStatusRq = {
  token: Scalars['String']['input'];
};

export type ToggleCustomerStatusRq = {
  token: Scalars['String']['input'];
};

export type ToggleUserStatus = {
  token: Scalars['String']['input'];
};

export type Traffic = {
  card?: Maybe<Card>;
  customer?: Maybe<Customer>;
  entrance: Scalars['DateTime']['output'];
  entrance_driver_image?: Maybe<Scalars['String']['output']>;
  entrance_plate_image?: Maybe<Scalars['String']['output']>;
  entrance_session?: Maybe<Session>;
  exit?: Maybe<Scalars['DateTime']['output']>;
  exit_driver_image?: Maybe<Scalars['String']['output']>;
  exit_plate_image?: Maybe<Scalars['String']['output']>;
  exit_session?: Maybe<Session>;
  group?: Maybe<Group>;
  plate_serial?: Maybe<Scalars['String']['output']>;
  presence_duration_in_ms?: Maybe<Scalars['Float']['output']>;
  temporal_exit?: Maybe<Scalars['DateTime']['output']>;
  temporal_exit_amount?: Maybe<Scalars['Float']['output']>;
  temporal_exit_type?: Maybe<E_TemporalExitType>;
  token: Scalars['String']['output'];
  tx?: Maybe<Transaction>;
  type: E_TrafficType;
  user?: Maybe<User>;
};

export type TrafficAverageItem = {
  avg_presence_in_ms: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
  traffic_count: Scalars['Float']['output'];
};

export type TrafficEditedPlateItem = {
  card_number: Scalars['String']['output'];
  edited_plate_serial: Scalars['String']['output'];
  entrance_image?: Maybe<Scalars['String']['output']>;
  exit: Scalars['DateTime']['output'];
  exit_image?: Maybe<Scalars['String']['output']>;
  exit_user_fullname: Scalars['String']['output'];
  group_title: Scalars['String']['output'];
  system_plate_serial: Scalars['String']['output'];
};

export type TrafficExitEntranceBucket = {
  range: Scalars['String']['output'];
  values: HourlyTrafficData;
};

export type TrafficInactiveCar = {
  card_number: Scalars['String']['output'];
  entrance: Scalars['DateTime']['output'];
  entrance_image?: Maybe<Scalars['String']['output']>;
  expiration_date?: Maybe<Scalars['String']['output']>;
  is_listed: Scalars['Boolean']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
  type: E_CardType;
};

export type TrafficPresenceBucket = {
  range: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type TrafficWithDiscountItem = {
  card_number: Scalars['String']['output'];
  discount_amount: Scalars['Float']['output'];
  discount_code?: Maybe<Scalars['String']['output']>;
  discount_name: Scalars['String']['output'];
  discount_price: Scalars['Float']['output'];
  discount_type: E_DiscountType;
  exit: Scalars['DateTime']['output'];
  exit_image?: Maybe<Scalars['String']['output']>;
  exit_user_fullname: Scalars['String']['output'];
  initial_price: Scalars['Float']['output'];
  paid_price: Scalars['Float']['output'];
  plate_serial?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  discount_amount: Scalars['Float']['output'];
  initial_amount: Scalars['Float']['output'];
  label: E_TransactionLabel;
  manual_exit_amount: Scalars['Float']['output'];
  paid_amount: Scalars['Float']['output'];
  payment?: Maybe<TransactionPayment>;
  pos_id?: Maybe<Scalars['Float']['output']>;
  tax_amount: Scalars['Float']['output'];
  token: Scalars['String']['output'];
  type: E_TransactionType;
};

export type TransactionItem = {
  card_number: Scalars['String']['output'];
  discount_amount: Scalars['Float']['output'];
  end?: Maybe<Scalars['DateTime']['output']>;
  initial_amount: Scalars['Float']['output'];
  label: E_TransactionLabel;
  paid_amount: Scalars['Float']['output'];
  presence_duration?: Maybe<Scalars['Float']['output']>;
  start: Scalars['DateTime']['output'];
  type: E_TransactionType;
  user_full_name: Scalars['String']['output'];
};

export type TransactionPayment = {
  card_to_card: Scalars['Float']['output'];
  cash: Scalars['Float']['output'];
  pos: Scalars['Float']['output'];
};

export type UnassignCustomerCardRq = {
  customer_token: Scalars['String']['input'];
};

export type UnblockCarRq = {
  token: Scalars['String']['input'];
};

export type UpdateCustomerSubRq = {
  card_token?: InputMaybe<Scalars['String']['input']>;
  customer_token: Scalars['String']['input'];
  expiration_date?: InputMaybe<Scalars['DateTime']['input']>;
  group_token?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDefaultCashGroupRq = {
  group_token: Scalars['String']['input'];
};

export type UpdateFundRq = {
  card_to_card_income?: InputMaybe<Scalars['Float']['input']>;
  cash_income?: InputMaybe<Scalars['Float']['input']>;
  created_by_token?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  issue_date?: InputMaybe<Scalars['DateTime']['input']>;
  manual_pos_tokens?: InputMaybe<Array<Scalars['String']['input']>>;
  pos_income?: InputMaybe<Scalars['Float']['input']>;
  supervisor_token?: InputMaybe<Scalars['String']['input']>;
  system_pos_token?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type UpdateGroupInfoRq = {
  card_issuance_fee?: InputMaybe<Scalars['Float']['input']>;
  cash_adjustment?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateParkingInfoRq = {
  capacity: Scalars['Float']['input'];
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateParkingOccupiedRq = {
  type: E_UpdateParkingOperation;
};

export type UpdateRoleRq = {
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  token: Scalars['String']['input'];
};

export type UpdateUserRoleRq = {
  role_token: Scalars['String']['input'];
  user_token: Scalars['String']['input'];
};

export type UseDiscountCodeRq = {
  code: Scalars['String']['input'];
  discount_token: Scalars['String']['input'];
};

export type User = {
  expiration_date: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  is_active: Scalars['Boolean']['output'];
  manual_exit_daily_limit?: Maybe<Scalars['Float']['output']>;
  manual_exit_monthly_limit?: Maybe<Scalars['Float']['output']>;
  profile_image?: Maybe<Scalars['String']['output']>;
  rate_limit: Scalars['Float']['output'];
  role: Role;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserLoginDesktopRq = {
  client_token?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLoginRq = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLogoutDesktopRq = {
  fund_token?: InputMaybe<Scalars['String']['input']>;
};
