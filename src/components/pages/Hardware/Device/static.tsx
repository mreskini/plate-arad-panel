import type { T_StatusVariant } from "@components/common"
import type { T_InputDropdownOption } from "@components/template"
import type { E_DeviceType } from "@core/api"
import { typedKeys } from "@core/functions"
import type { KeysWithoutReturnObjects } from "i18next"

export const DeviceTypeColorMap: { [key in E_DeviceType]: T_StatusVariant } = {
    RELAY: "success",
    CAMERA: "info",
    READER: "warning",
}

export const DeviceTypeKeyMap: { [key in E_DeviceType]: KeysWithoutReturnObjects["status"] } = {
    RELAY: "relay",
    CAMERA: "camera",
    READER: "reader",
}

export enum E_CameraBrand {
    HikVision = "hik_vision",
    Dahua = "dahua",
}
export const CameraBrandContentKeyMap: { [key in E_CameraBrand]: KeysWithoutReturnObjects["input"] } = {
    hik_vision: "hik_vision",
    dahua: "dahua",
}

export const CameraBrandOptions: T_InputDropdownOption[] = typedKeys(E_CameraBrand).map(_ => ({
    labelKey: CameraBrandContentKeyMap[E_CameraBrand[_]],
    value: E_CameraBrand[_],
}))
