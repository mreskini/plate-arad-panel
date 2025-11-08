import type { E_DayOfWeek } from "@core/api"
import type { KeysWithoutReturnObjects } from "i18next"

export const DayOfWeekMap: { [key in E_DayOfWeek]: KeysWithoutReturnObjects["common"] } = {
    SATURDAY: "saturday",
    SUNDAY: "sunday",
    MONDAY: "monday",
    TUESDAY: "tuesday",
    WEDNESDAY: "wednesday",
    THURSDAY: "thursday",
    FRIDAY: "friday",
}
