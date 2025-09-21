import type { CurrentUserQuery, ParkingInfoQuery } from "./generated"

// User
export type T_User = CurrentUserQuery["currentUser"]
export type T_Parking = ParkingInfoQuery["parkingInfo"]
