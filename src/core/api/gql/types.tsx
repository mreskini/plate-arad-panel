import type { CurrentUserQuery, ParkingInfoQuery } from "./generated"

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
