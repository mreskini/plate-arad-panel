import type { T_ErrorObject } from "@core/stores"
import axios from "axios"

export const fetchErrorsFromApi = async (): Promise<T_ErrorObject | null> => {
    const endpoint = import.meta.env.VITE_PUBLIC_ERROR_API_ROUTE ?? ""
    if (!endpoint) return null

    const { data } = await axios.get<{ fa: T_ErrorObject }>(endpoint)
    if (data) return data.fa

    return null
}
