import type { CurrentUserQuery, FetchRolesQuery, FetchUsersListQuery, ParkingInfoQuery } from "./generated"

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
    }[]
}

export type T_Owner = T_FetchOwners["items"][number]
