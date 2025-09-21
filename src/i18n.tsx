import FaAlerts from "@locales/fa/alerts.json"
import FaAuth from "@locales/fa/auth.json"
import FaButton from "@locales/fa/button.json"
import FaCommon from "@locales/fa/common.json"
import FaDashboard from "@locales/fa/dashboard.json"
import FaInput from "@locales/fa/input.json"
import FaLetters from "@locales/fa/letters.json"
import FaStatus from "@locales/fa/status.json"
import FaTables from "@locales/fa/tables.json"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const defaultNS = "common"
export const lang = "fa"
export const resources = {
    fa: {
        alerts: FaAlerts,
        auth: FaAuth,
        button: FaButton,
        common: FaCommon,
        input: FaInput,
        letters: FaLetters,
        status: FaStatus,
        tables: FaTables,
        dashboard: FaDashboard,
    },
} as const

i18n.use(initReactI18next).init({
    lng: lang,
    defaultNS,
    resources,
    fallbackLng: "fa",
    keySeparator: ".",
})
