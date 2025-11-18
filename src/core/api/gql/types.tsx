import type {
    CurrentUserQuery,
    E_IdentifierType,
    FetchAccessControlsQuery,
    FetchClientsQuery,
    FetchCustomersQuery,
    FetchDevicesQuery,
    FetchIdentifiersQuery,
    FetchRolesQuery,
    FetchSchedulesQuery,
    FetchUsersListQuery,
    ParkingInfoQuery,
    PingAllDevicesQuery,
} from "./generated"

// User
export type T_User = CurrentUserQuery["currentUser"]

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

export type T_FetchCustomers = FetchCustomersQuery["fetchCustomers"]
export type T_Customer = T_FetchCustomers["items"][number]

export type T_FetchIdentifiers = FetchIdentifiersQuery["fetchIdentifiers"]
export type T_Identifier = T_FetchIdentifiers["items"][number]

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
            type: E_IdentifierType
            card_number: string
        }
    }[]
}

export type T_TrafficWithCard = T_FetchTrafficWithCard["items"][number]

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

export type T_AccessControl = FetchAccessControlsQuery["fetchAccessControls"][number]

export type T_Parking = ParkingInfoQuery["parkingInfo"]
export type T_Client = FetchClientsQuery["fetchClients"][number]
export type T_FlatClient = Pick<T_Client, "token" | "name" | "type">
export type T_Schedule = FetchSchedulesQuery["fetchSchedules"][number]
export type T_FlatSchedule = Pick<T_Schedule, "token" | "title">
