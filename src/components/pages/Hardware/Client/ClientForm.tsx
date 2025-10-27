import type { T_InputDropdownOption } from "@components/template"
import { Button, Input, Spinner } from "@components/template"
import type { E_ClientType, T_Client } from "@core/api"
import { API, E_DeviceType } from "@core/api"
import { t } from "i18next"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { ClientTypeKeyMap } from "./static"

export interface I_ClientFormData {
    name: string
    type: E_ClientType
    relay_token: string
    camera_token: string
}

interface I_Props {
    onSubmit: (data: I_ClientFormData) => Promise<void>
    onClose: Function
    client?: T_Client
}

export const ClientForm: FC<I_Props> = ({ onSubmit, onClose, client }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)
    const [cameraOptions, setCameraOptions] = useState<T_InputDropdownOption[]>([])
    const [relayOptions, setRelayOptions] = useState<T_InputDropdownOption[]>([])

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_ClientFormData>({ mode: "onChange" })

    const isValid = watch("name") && watch("type")

    // Methods
    const init = async () => {
        const { data } = await API.Device.FetchDevices()

        const CameraDevices = data?.fetchDevices.filter(device => device.type === E_DeviceType.Camera)
        if (!CameraDevices || CameraDevices?.length === 0) return
        const CameraOptionItems: T_InputDropdownOption[] = CameraDevices.map(_ => ({ label: _.name, value: _.token }))

        const RelayDevices = data?.fetchDevices.filter(device => device.type === E_DeviceType.Relay)
        if (!RelayDevices || RelayDevices?.length === 0) return
        const RelayOptionItems: T_InputDropdownOption[] = RelayDevices.map(_ => ({ label: _.name, value: _.token }))

        setCameraOptions(CameraOptionItems)
        setRelayOptions(RelayOptionItems)

        setIsFetching(false)
    }

    const formDataBinding = () => {
        if (!client) return
        setValue("name", client.name)
        setValue("type", client.type)
        setValue("relay_token", client.relay?.token || "")
        setValue("camera_token", client.camera?.token || "")
    }

    useEffect(() => {
        init()
        formDataBinding()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-3xl flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}

            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-3xl grid grid-cols-2 gap-4">
                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="client_name" className="min-w-24" required />
                        <Input
                            placeholder="client_name_placeholder"
                            disabled={isSubmitting}
                            {...register("name", { required: true, minLength: 2 })}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="client_type" className="min-w-24" required />
                        <Input.DropDown
                            options={Object.keys(ClientTypeKeyMap).map((_: string) => {
                                return {
                                    value: _,
                                    label: t(ClientTypeKeyMap[_ as E_ClientType]),
                                }
                            })}
                            value={getValues("type")}
                            setValue={(_: E_ClientType) => setValue("type", _)}
                            wrapperClassName="w-full"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="camera" className="min-w-24" />
                        <Input.DropDown
                            options={cameraOptions}
                            disabled={isSubmitting}
                            value={getValues("camera_token")}
                            setValue={(_: string) => setValue("camera_token", _)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="relay_board" className="min-w-24" />
                        <Input.DropDown
                            options={relayOptions}
                            disabled={isSubmitting}
                            value={getValues("relay_token")}
                            setValue={(_: string) => setValue("relay_token", _)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-8 col-span-2">
                        <Button
                            contentKey={client ? "save" : "add"}
                            type="submit"
                            className="w-40"
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting}
                        />
                        <Button
                            contentKey="cancel"
                            variant="gray-outline"
                            onClick={() => onClose()}
                            className="w-40"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            )}
        </>
    )
}
