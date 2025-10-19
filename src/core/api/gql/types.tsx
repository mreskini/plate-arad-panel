import type {
    CurrentUserQuery,
    E_ClientType,
    E_DeviceType,
    E_GroupType,
    FetchDevicesQuery,
    FetchRolesQuery,
    FetchUsersListQuery,
    PingAllDevicesQuery,
} from "./generated"

// User
export type T_User = CurrentUserQuery["currentUser"]
export type T_Parking = {
    name: string
    code: string
    capacity: number
    cash_adjustment: number
    card_issuance_fee: number
    license?: string | null | undefined
    server_uuid?: string | null | undefined
    clients_count?: number
    plate_reader?: boolean
    pos?: boolean
    UHF?: boolean
    default_cash_group?:
        | {
              token: string
              title: string
              type: E_GroupType
          }
        | null
        | undefined
}

// Report
export type T_FetchTraffic = {
    count: number
    items: {
        camera_name: string
        plate_serial?: string | null | undefined
        owner_name: string
        entrance: any
        exit?: any
        entrance_image?: string | null | undefined
        exit_image?: string | null | undefined
        direction: string
        permission: string
    }[]
}

export type T_Traffic = T_FetchTraffic["items"][number]

export type T_FetchWithoutPlateTraffic = {
    count: number
    items: {
        camera_name: string
        owner_name: string
        entrance: any
        exit?: any
        entrance_image?: string | null | undefined
        exit_image?: string | null | undefined
        direction: string
        permission: string
    }[]
}

export type T_WithoutPlateTraffic = T_FetchWithoutPlateTraffic["items"][number]

export type T_FetchUsersList = FetchUsersListQuery["fetchUsersList"]
export type T_Role = FetchRolesQuery["fetchRoles"][number]

export type T_FetchOwners = {
    count: number
    items: {
        firstname: string
        lastname: string
        national_code: string
        phone_number: string
        descriptions: string
        profile_image?: string
        created_at: any
        vehicles: {
            plate_number: string
            vehicle_model: string
            vehicle_color: string
            vehicle_year: string
            vehicle_image?: string
        }[]
        card?: T_Card | null
        apb: boolean
    }[]
}

export type T_Owner = T_FetchOwners["items"][number]

export enum E_OwnerCardType {
    UHF = "UHF",
    CSN = "CSN",
    PLATE = "PLATE",
}

export type T_FetchCards = {
    count: number
    items: {
        token: string
        type: E_OwnerCardType
        serial: string
        is_active: boolean
        card_number: string
    }[]
}

export type T_Card = T_FetchCards["items"][number]
export type T_Device = FetchDevicesQuery["fetchDevices"][number]
export type T_PingAllDevices = PingAllDevicesQuery["pingAllDevices"][number]

export type T_Door = { token: string; name: string }

export type T_FetchTrafficWithCard = {
    count: number
    items: {
        camera_name: string
        plate_serial?: string | null | undefined
        owner_name: string
        entrance: any
        exit?: any
        entrance_image?: string | null | undefined
        exit_image?: string | null | undefined
        direction: string
        permission: string
        card: {
            token: string
            type: E_OwnerCardType
            card_number: string
        }
    }[]
}

export type T_TrafficWithCard = T_FetchTrafficWithCard["items"][number]

export type T_Client = {
    token: string
    type: E_ClientType
    name: string
    ip_address: string
    has_operator: boolean
    pos?: {
        token: string
        ip: string
        num: number
        terminal: number
    } | null
    relay?: {
        token: string
        type: E_DeviceType
        name: string
        ip: string
    } | null
    plate_cam?: {
        token: string
        type: E_DeviceType
        name: string
        ip: string
    } | null
}

export enum E_PosBrandName {
    Parsian = "PARSIAN",
    Sep = "SEP",
}

export type T_POS = {
    token: string
    num: number
    terminal: number
    brand_name: E_PosBrandName
    ip: string
}

export type T_FetchTrafficWithEmergency = {
    count: number
    items: {
        camera_name: string
        plate_serial?: string | null | undefined
        entrance: any
        exit?: any
        entrance_image?: string | null | undefined
        exit_image?: string | null | undefined
        direction: string
        descriptions: string
    }[]
}

export type T_TrafficWithEmergency = T_FetchTrafficWithEmergency["items"][number]

export type T_FetchScheduleList = {
    title: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
    is_active: boolean
}[]

export type T_Schedule = T_FetchScheduleList[number]
