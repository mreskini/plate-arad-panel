import type { T_ErrorObject } from "@core/stores"

export const getSystemErrorMessages = (): T_ErrorObject | null => {
    const errorStateStringifiedJson = localStorage.getItem("ERROR_STATE")
    if (errorStateStringifiedJson) {
        const obj = JSON.parse(errorStateStringifiedJson)
        if (obj?.state?.errors) return obj.state.errors
    }
    return null
}
