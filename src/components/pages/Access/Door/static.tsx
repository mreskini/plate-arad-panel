import type { T_InputDropdownOption } from "@components/template"
import { E_ClientType } from "@core/api"
import { typedKeys } from "@core/functions"
import type { KeysWithoutReturnObjects } from "i18next"

export const ClientTypeKeyMap: { [key in E_ClientType]: KeysWithoutReturnObjects["input"] } = {
    INPUT: "input",
    OUTPUT: "output",
}

export const ClientTypeOptions: T_InputDropdownOption[] = typedKeys(E_ClientType).map(_ => ({
    labelKey: ClientTypeKeyMap[E_ClientType[_]],
    value: E_ClientType[_],
}))
