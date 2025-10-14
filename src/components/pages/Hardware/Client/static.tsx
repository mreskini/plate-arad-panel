import type { E_ClientType } from "@core/api"
import type { KeysWithoutReturnObjects } from "i18next"

export const ClientTypeKeyMap: { [key in E_ClientType]: KeysWithoutReturnObjects["common"] } = {
    INPUT: "input",
    OUTPUT: "output",
    INPUT_OUTPUT: "input_output",
}
