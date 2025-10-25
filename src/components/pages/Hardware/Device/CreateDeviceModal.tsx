import { Button, Divider, Input, Modal, Text, useNotify } from "@components/template"
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
}

interface I_FormData {
    name: string
    type: E_DeviceType
    ip: string
    brand?: string
    username?: string
    password?: string
}

const CurrentModal = Modals.Hardware.Devices.Add

export const CreateDeviceModal: FC<I_Props> = ({ callback }) => {
    // States and Hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()
    const { t } = useTranslation("status")
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
            name: "",
            type: E_DeviceType.Camera,
            ip: "",
        },
    })

    const isCameraType = watch("type") === E_DeviceType.Camera

    const isValid =
        watch("name") &&
        watch("type") &&
        watch("ip") &&
        (!isCameraType || (watch("brand") && watch("username") && watch("password")))

    // Methods
    const onSubmit = async (formData: I_FormData) => {
        const { data, error } = await API.Device.CreateDevice({
            body: {
                name: formData.name,
                type: formData.type,
                ip: formData.ip,
                ...(isCameraType && {
                    brand_name: formData.brand,
                    username: formData.username,
                    password: formData.password,
                }),
            },
        })

        if (data && data.createDevice) {
            await callback()
            notify("device_created_successfully", "success")
            closeModal(CurrentModal)
        }
        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add" variant="title-1" className="text-neutral-700" weight={600} />}
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
                    <Input.DropDown
                        options={Object.keys(DeviceTypeKeyMap).map((_: string) => {
                            return {
                                value: _,
                                label: t(DeviceTypeKeyMap[_ as E_DeviceType]),
                            }
                        })}
                        disabled={isSubmitting}
                        value={getValues("type")}
                        setValue={(_: string) => setValue("type", _ as E_DeviceType)}
                        wrapperClassName="max-w-lg"
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

                <div className="flex items-center gap-4">
                    <Button
                        contentKey="add"
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
