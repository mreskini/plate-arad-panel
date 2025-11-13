import type { T_InputDropdownOption } from "@components/template"
import { Button, Input, Spinner } from "@components/template"
import type { T_AccessControl, T_Client, T_Schedule } from "@core/api"
import { useCommon } from "@core/contexts"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_AccessControlFormData) => Promise<void>
    onClose: Function
    accessControl?: T_AccessControl
}

export interface I_AccessControlFormData {
    title: string
    clientToken: string
    scheduleToken: string
}

export const AccessControlForm: FC<I_Props> = ({ onSubmit, onClose, accessControl }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)
    const [clientsOptions, setClientsOptions] = useState<T_InputDropdownOption[]>([])
    const [schedulesOptions, setSchedulesOptions] = useState<T_InputDropdownOption[]>([])
    const { fetchFlatClients, fetchFlatSchedules } = useCommon()

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { isSubmitting },
    } = useForm<I_AccessControlFormData>({
        mode: "onChange",
    })

    // Flags
    const isValid = watch("title") && watch("clientToken") && watch("scheduleToken")

    // Methods
    const init = async () => {
        formDataBinding()
        const [clients, schedules] = await Promise.all([fetchFlatClients(), fetchFlatSchedules()])
        setClientsOptions(clients.map((client: T_Client) => ({ label: client.name, value: client.token })))
        setSchedulesOptions(schedules.map((schedule: T_Schedule) => ({ label: schedule.title, value: schedule.token })))
        setIsFetching(false)
    }

    const formDataBinding = () => {
        if (!accessControl) return

        setValue("title", accessControl.title)
        setValue("clientToken", accessControl.client.token)
        setValue("scheduleToken", accessControl.schedule.token)
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-lg flex items-center justify-center py-32">
                    <Spinner />
                </div>
            )}
            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-lg">
                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="title" className="min-w-32" required />
                        <Input
                            placeholder="enter_access_control_title_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("title", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="client" className="min-w-32" required />
                        <Input.DropDown
                            options={clientsOptions}
                            disabled={isSubmitting}
                            className="w-full"
                            value={getValues("clientToken")}
                            setValue={(value: string) => setValue("clientToken", value)}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="schedule" className="min-w-32" required />
                        <Input.DropDown
                            options={schedulesOptions}
                            disabled={isSubmitting}
                            className="w-full"
                            value={getValues("scheduleToken")}
                            setValue={(value: string) => setValue("scheduleToken", value)}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="access_type" className="min-w-32" required />
                        <Input.DropDown
                            options={[
                                { labelKey: "UHF", value: "UHF" },
                                { labelKey: "CSN", value: "CSN" },
                                { labelKey: "plate", value: "PLATE" },
                                { labelKey: "UHF_and_CSN", value: "UHF&&CSN" },
                                { labelKey: "plate_and_CSN", value: "PLATE&&CSN" },
                                { labelKey: "UHF_or_CSN", value: "UHF||CSN" },
                                { labelKey: "plate_or_CSN", value: "PLATE||CSN" },
                            ]}
                            disabled={isSubmitting}
                            className="w-full"
                            setValue={() => {}}
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <Button
                            contentKey={accessControl ? "save" : "add"}
                            type="submit"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
                        />

                        <Button
                            contentKey="cancel"
                            variant="gray-outline"
                            onClick={() => onClose()}
                            className="w-full"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            )}
        </>
    )
}
