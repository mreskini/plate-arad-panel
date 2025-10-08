import type { T_StatusVariant } from "@components/common"
import type { T_InputDropdownOption } from "@components/template"
import type { E_DeviceType } from "@core/api"
import { typedKeys } from "@core/functions"
import type { KeysWithoutReturnObjects } from "i18next"

export const DeviceTypeColorMap: { [key in E_DeviceType]: T_StatusVariant } = {
    RELAY: "success",
    CONTROLLER: "warning",
    DRIVER_CAMERA: "info",
    PLATE_CAMERA: "error",
    READER: "success",
}

export const DeviceTypeKeyMap: { [key in E_DeviceType]: KeysWithoutReturnObjects["status"] } = {
    RELAY: "relay",
    CONTROLLER: "controller",
    DRIVER_CAMERA: "driver_cam",
    PLATE_CAMERA: "plate_cam",
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
