import type {
    CurrentUserQuery,
    FetchAccessControlsQuery,
    FetchClientsQuery,
    FetchDevicesQuery,
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
    Card = "Card",
    Tag = "Tag",
    Plate = "Plate",
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
