import type { T_MenuCategory } from "@components/layout"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type T_States = {
    currentMenu: string | null
    category: T_MenuCategory
    openSubMenu: string | null
    isSidebarOverlayOpen: boolean
    isAuthenticating: boolean
}

type T_Actions = {
    setOpenSubMenu: (by: string | null) => void
    setIsSidebarOverlayOpen: (by: boolean) => void
    setIsAuthenticating: (by: boolean) => void
    setCurrentMenu: (by: string | null) => void
    setCategory: (by: T_MenuCategory) => void
}

export const useLayout = create(
    immer<T_States & T_Actions>(set => ({
        currentMenu: null,
        category: "dashboard",
        openSubMenu: null,
        currentAdmin: null,
        isAuthenticating: true,
        isSidebarOverlayOpen: false,

        setIsSidebarOverlayOpen(by) {
            set(state => {
                state.isSidebarOverlayOpen = by
            })
        },

        setIsAuthenticating(by) {
            set(state => {
                state.isAuthenticating = by
            })
        },
        setCurrentMenu(by) {
            set(state => {
                state.currentMenu = by
            })
        },
        setOpenSubMenu(by) {
            set(state => {
                state.openSubMenu = by
            })
        },
        setCategory(by) {
            set(state => {
                state.category = by
            })
        },
    }))
)
