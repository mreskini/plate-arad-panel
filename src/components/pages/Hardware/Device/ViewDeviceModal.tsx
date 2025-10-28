import { Input, Modal, Text } from "@components/template"
import type { T_Device } from "@core/api"
import { E_DeviceType } from "@core/api"
import { Modals } from "@core/utilities"
import { find } from "lodash"
import { type FC } from "react"
import { useTranslation } from "react-i18next"

import { CameraBrandOptions, DeviceTypeKeyMap } from "./static"

interface I_Props {
    device: T_Device
}

const CurrentModal = Modals.Hardware.Devices.View

export const ViewDeviceModal: FC<I_Props> = ({ device }) => {
    // States and Hooks
    const { t } = useTranslation("status")

    const isCameraType = device.type === E_DeviceType.Camera
    const isRelayType = device.type === E_DeviceType.Relay

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <div className="flex items-center">
                    <Text
                        contentKey="device_details"
                        variant="title-1"
                        className="text-neutral-700 me-2"
                        weight={400}
                    />
                    <Text content={device.name} variant="title-1" className="text-neutral-700" weight={600} />
                </div>
            }
            closeButton
        >
            <div className="sm:min-w-sm">
                <div className="flex w-full items-center justify-between gap-4 mb-4">
                    <Input.Label labelKey="type" />
                    <Text content={t(DeviceTypeKeyMap[device.type])} />
                </div>

                <div className="flex w-full items-center justify-between gap-4 mb-4">
                    <Input.Label labelKey="ip_address" />
                    <Text content={device.ip} className="font-courier" />
                </div>

                {isCameraType && (
                    <>
                        <div className="flex w-full items-center justify-between gap-4 mb-4">
                            <Input.Label labelKey="brand" />
                            <Text
                                contentKey={find(CameraBrandOptions, { value: device.brand_name! })?.labelKey}
                                ns="input"
                            />
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 mb-4">
                            <Input.Label labelKey="username" />
                            <Text content={device.username!} />
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 mb-4">
                            <Input.Label labelKey="password" />
                            <Text content={device.password!} />
                        </div>
                    </>
                )}

                {isRelayType && (
                    <>
                        <div className="flex w-full items-center justify-between gap-4 mb-4">
                            <Input.Label labelKey="channel_number" />
                            <Text content={device.channel!} />
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 mb-4">
                            <Input.Label labelKey="username" />
                            <Text content={device.username!} />
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 mb-4">
                            <Input.Label labelKey="password" />
                            <Text content={device.password!} />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
