import { Button, Divider, Input, Modal, Text, useNotify } from "@components/template"
import type { T_Device } from "@core/api"
import { API, E_DeviceType } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import type { E_CameraBrand } from "./static"
import { CameraBrandOptions, DeviceTypeKeyMap } from "./static"

interface I_Props {
    callback: Function
    device: T_Device
}

interface I_FormData {
    name: string
    type: E_DeviceType
    ip: string
    port?: number
    brand?: string
    username?: string
    password?: string
    channel?: number
}

const CurrentModal = Modals.Access.Devices.Edit

export const EditDeviceModal: FC<I_Props> = ({ callback, device }) => {
    // States and Hooks
    const { t } = useTranslation("status")
    const { closeModal } = useModal()
    const { notify } = useNotify()
    // States and Hooks
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_FormData>({
        mode: "onChange",
        defaultValues: {
            name: device.name,
            type: device.type,
            ip: device.ip,
            port: device.port || 0,
            brand: device.brand_name || "",
            channel: device.channel || 0,
            username: device.username || "",
            password: device.password || "",
        },
    })

    const isCameraType = watch("type") === E_DeviceType.Camera
    const isRelayType = watch("type") === E_DeviceType.Relay
    const isReaderType = watch("type") === E_DeviceType.Reader

    const channel = watch("channel")
    const port = watch("port")

    const isValid =
        watch("name") &&
        watch("type") &&
        watch("ip") &&
        (!isCameraType || (watch("brand") && watch("username") && watch("password"))) &&
        (!isReaderType || port?.toString()) &&
        (!isRelayType || (channel !== undefined && channel > -1 && watch("username") && watch("password")))

    // Methods
    const onSubmit = async (formData: I_FormData) => {
        const { data, error } = await API.Device.EditDevice({
            body: {
                token: device.token,
                name: formData.name,
                type: formData.type,
                ip: formData.ip,
                ...(isCameraType && {
                    brand_name: formData.brand,
                    username: formData.username,
                    password: formData.password,
                }),
                ...(isRelayType && {
                    channel: formData.channel,
                    username: formData.username,
                    password: formData.password,
                }),
                ...(isReaderType && {
                    port: formData.port,
                }),
            },
        })

        if (data && data.editDevice) {
            await callback()
            notify("device_updated_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit_device" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-xl">
                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="device_name" className="min-w-20" required />
                    <Input
                        placeholder="device_name"
                        disabled={isSubmitting}
                        className="w-full"
                        {...register("name", {
                            required: true,
                            minLength: 1,
                        })}
                    />
                </div>

                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="type" className="min-w-20" required />
                    <Input
                        placeholder="type"
                        disabled
                        value={t(DeviceTypeKeyMap[getValues("type")])}
                        className="w-full"
                    />
                </div>

                <div className="flex w-full items-center gap-4">
                    <Input.Label labelKey="ip_address" className="min-w-20" required />
                    <Input
                        placeholder="ip_address_placeholder"
                        disabled={isSubmitting}
                        className="w-full"
                        {...register("ip", {
                            required: true,
                            minLength: 1,
                        })}
                    />
                </div>

                <Divider className="w-full my-4" />

                {isCameraType && (
                    <>
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="brand" className="min-w-20" required />
                            <Input.DropDown
                                placeholder="choose_camera_brand"
                                options={CameraBrandOptions}
                                value={getValues("brand")}
                                setValue={(value: E_CameraBrand) => setValue("brand", value)}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="username" className="min-w-20" required />
                            <Input
                                placeholder="enter_username"
                                disabled={isSubmitting}
                                className="w-full"
                                {...register("username", {
                                    required: true,
                                    minLength: 1,
                                })}
                            />
                        </div>

                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="password" className="min-w-20" required />
                            <div className="w-full">
                                <Input.Password
                                    placeholder="your_password_here"
                                    disabled={isSubmitting}
                                    {...register("password", {
                                        required: true,
                                        minLength: 1,
                                    })}
                                />
                            </div>
                        </div>
                    </>
                )}

                {isRelayType && (
                    <>
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="channel_number" className="min-w-20" required />
                            <Input.Number
                                placeholder="enter_channel_number"
                                disabled={isSubmitting}
                                className="w-full"
                                value={getValues("channel")}
                                setValue={value => setValue("channel", value)}
                            />
                        </div>

                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="username" className="min-w-20" required />
                            <Input
                                placeholder="enter_username"
                                disabled={isSubmitting}
                                className="w-full"
                                {...register("username", {
                                    required: true,
                                    minLength: 1,
                                })}
                            />
                        </div>

                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="password" className="min-w-20" required />
                            <div className="w-full">
                                <Input.Password
                                    placeholder="your_password_here"
                                    disabled={isSubmitting}
                                    {...register("password", {
                                        required: true,
                                        minLength: 1,
                                    })}
                                />
                            </div>
                        </div>
                    </>
                )}

                {isReaderType && (
                    <div className="flex w-full items-center gap-4 mb-4">
                        <Input.Label labelKey="port" className="min-w-20" required />
                        <Input.Number
                            placeholder="enter_port_number"
                            disabled={isSubmitting}
                            className="w-full"
                            value={getValues("port")}
                            setValue={value => setValue("port", value)}
                        />
                    </div>
                )}

                <div className="flex items-center gap-4 mt-8">
                    <Button
                        contentKey="save"
                        type="submit"
                        className="w-40"
                        loading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                    />
                    <Button
                        contentKey="cancel"
                        variant="gray-outline"
                        onClick={() => closeModal(CurrentModal)}
                        className="w-40"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </Modal>
    )
}
