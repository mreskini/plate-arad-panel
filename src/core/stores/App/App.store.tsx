import type { T_Parking, T_User } from "@core/api"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type T_States = {
    // TODO: Delete the UHF related stuff
    currentUHF: string
    currentUser: T_User | null
    permissions: string[]
    parking: T_Parking | null
}

type T_Actions = {
    // TODO: Delete the UHF related stuff
    setCurrentUHF: (by: string) => void
    setCurrentUser: (by: T_User | null) => void
    setPermissions: (by: string[]) => void
    setParking: (by: T_Parking | null) => void
}

export const useApp = create(
    immer<T_States & T_Actions>(set => ({
        currentUHF: "",
        parking: null,
        currentUser: null,
        permissions: [],
        setCurrentUHF(by) {
            set(state => {
                state.currentUHF = by
            })
        },
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
