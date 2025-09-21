import type { T_Parking, T_User } from "@core/api"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type T_States = {
    currentUser: T_User | null
    permissions: string[]
    parking: T_Parking | null
}

type T_Actions = {
    setCurrentUser: (by: T_User | null) => void
    setPermissions: (by: string[]) => void
    setParking: (by: T_Parking | null) => void
}

export const useApp = create(
    immer<T_States & T_Actions>(set => ({
        parking: null,
        currentUser: null,
        permissions: [],
        setCurrentUser(by) {
            set(state => {
                state.currentUser = by
            })
        },
        setPermissions(by) {
            set(state => {
                state.permissions = by
            })
        },
        setParking(by) {
            set(state => {
                state.parking = by
            })
        },
    }))
)
