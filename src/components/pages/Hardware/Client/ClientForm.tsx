import { Button, Input, Spinner } from "@components/template"
import type { E_ClientType, T_Client, T_Device, T_POS } from "@core/api"
import { E_DeviceType } from "@core/api"
import { sleep } from "@core/functions"
import { t } from "i18next"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { ClientTypeKeyMap } from "./static"

export interface I_ClientFormData {
    name: string
    type: E_ClientType
    client_ip: string
    has_operator: boolean
    relay_token?: string
    plate_cam_token?: string
    pos_token?: string
}

interface I_Props {
    onSubmit: (data: I_ClientFormData) => Promise<void>
    onClose: Function
    client?: T_Client
}

export const ClientForm: FC<I_Props> = ({ onSubmit, onClose, client }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)
    const [devices, setDevices] = useState<T_Device[]>([])
    const [posList, setPosList] = useState<T_POS[]>([])

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_ClientFormData>({
        mode: "onChange",
        defaultValues: { has_operator: true },
    })

    const isValid = watch("name") && watch("type") && watch("client_ip")

    // Methods
    const fetchDevices = async () => {
        await sleep(2000)
        setDevices([])
    }
    const fetchPosList = async () => {
        await sleep(2000)
        setPosList([])
    }
    const formDataBinding = () => {
        if (!client) return
        setValue("name", client.name)
        setValue("type", client.type)
        setValue("has_operator", client.has_operator)
        setValue("client_ip", client.ip_address)
        setValue("plate_cam_token", client.plate_cam?.token)
        setValue("relay_token", client.relay?.token)
        setValue("pos_token", client.pos?.token)
    }
    const init = async () => {
        await Promise.all([fetchDevices(), fetchPosList(), formDataBinding()])
        setIsFetching(false)
    }

    useEffect(() => {
        init()
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
                        <Input.Label labelKey="client_ip" className="min-w-24" required />
                        <Input
                            placeholder="example_url"
                            disabled={isSubmitting}
                            {...register("client_ip", { required: true, minLength: 2 })}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="plate_camera" className="min-w-24" />
                        <Input.DropDown
                            options={devices
                                .filter(_ => _.type === E_DeviceType.PlateCamera)
                                .map(_ => ({ label: _.name, value: _.token }))}
                            disabled={isSubmitting}
                            value={getValues("plate_cam_token")}
                            setValue={(_: string) => setValue("plate_cam_token", _)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="relay_board" className="min-w-24" />
                        <Input.DropDown
                            options={devices
                                .filter(_ => _.type === E_DeviceType.Relay)
                                .map(_ => ({ label: _.name, value: _.token }))}
                            disabled={isSubmitting}
                            value={getValues("relay_token")}
                            setValue={(_: string) => setValue("relay_token", _)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="pos_device" className="min-w-24" />
                        <Input.DropDown
                            options={posList.map(_ => ({ label: _.num.toString(), value: _.token }))}
                            disabled={isSubmitting}
                            value={getValues("pos_token")}
                            setValue={(_: string) => setValue("pos_token", _)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-4 col-span-2">
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
