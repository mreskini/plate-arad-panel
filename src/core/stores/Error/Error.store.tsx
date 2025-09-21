import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type T_ErrorObject = { [key in string]: string }

type T_State = {
    errors: T_ErrorObject
}

type T_Actions = {
    setErrors: (by: T_ErrorObject) => void
}

export const useError = create(
    persist(
        immer<T_State & T_Actions>(set => ({
            errors: {},
            setErrors(by: T_ErrorObject) {
                set(state => {
                    state.errors = by
                })
            },
        })),
        {
            name: "ERROR_STATE",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
