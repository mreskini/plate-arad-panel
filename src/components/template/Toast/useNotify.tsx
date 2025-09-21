import type { KeysWithoutReturnObjects } from "i18next"
import { useTranslation } from "react-i18next"
import type { TypeOptions } from "react-toastify"
import { toast } from "react-toastify"

export const useNotify = () => {
    // States and Hooks
    const { t: alertsTranslation } = useTranslation("alerts")

    // Methods
    const notify = (messageContentKey: KeysWithoutReturnObjects["alerts"], type: TypeOptions) => {
        const message = alertsTranslation(messageContentKey as KeysWithoutReturnObjects["alerts"])

        if (type === "success") return toast.success(message)
        if (type === "error") return toast.error(message)
        if (type === "warning") return toast.warning(message)
        if (type === "info") return toast.info(message)

        return toast.info(message)
    }

    return { notify }
}
