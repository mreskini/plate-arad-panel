import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type T_State = {
    accessToken: string | null
}

type T_Actions = {
    setAccessToken: (by: string) => void
}

export const useAuth = create(
    persist(
        immer<T_State & T_Actions>(set => ({
            accessToken: null,

            setAccessToken(by) {
                set(state => {
                    state.accessToken = by
                })
            },
        })),
        {
            name: "AUTH_STATE",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
