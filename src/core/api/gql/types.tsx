import type {
    CurrentUserQuery,
    FetchDevicesQuery,
    FetchRolesQuery,
    FetchUsersListQuery,
    ParkingInfoQuery,
    PingAllDevicesQuery,
} from "./generated"

// User
export type T_User = CurrentUserQuery["currentUser"]
export type T_Parking = ParkingInfoQuery["parkingInfo"]

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
    }[]
}

export type T_Owner = T_FetchOwners["items"][number]

export enum E_CardType {
    RFID = "RFID",
    CSN = "CSN",
}

export type T_FetchCards = {
    count: number
    items: {
        token: string
        type: E_CardType
        serial: string
        is_active: boolean
        card_number: string
    }[]
}

export type T_Card = T_FetchCards["items"][number]
export type T_Device = FetchDevicesQuery["fetchDevices"][number]
export type T_PingAllDevices = PingAllDevicesQuery["pingAllDevices"][number]
