import { Button, Input, Spinner } from "@components/template"
import type { T_Schedule } from "@core/api"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_ScheduleFormData) => Promise<void>
    onClose: Function
    schedule?: T_Schedule
}

export interface I_ScheduleFormData {
    title: string
    startDate: Date
    endDate: Date
    startTime: Date
    endTime: Date
}

export const ScheduleForm: FC<I_Props> = ({ onSubmit, onClose, schedule }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { isSubmitting },
    } = useForm<I_ScheduleFormData>({
        mode: "onChange",
    })

    // Methods
    const init = async () => {
        formDataBinding()
        setIsFetching(false)
    }
    const formDataBinding = () => {
        if (!schedule) return

        setValue("title", schedule.title)
        setValue("startDate", new Date(schedule.start_date))
        setValue("endDate", new Date(schedule.end_date))
        setValue("startTime", new Date(schedule.start_time))
        setValue("endTime", new Date(schedule.end_time))
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-lg flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}
            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-lg">
                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="title" className="min-w-32" required />
                        <Input
                            placeholder="enter_schedule_title_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("title", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="start_date" className="min-w-32" required />
                        <Input.DatePicker
                            value={getValues("startDate")}
                            onChange={value => setValue("startDate", value)}
                            disabled={isSubmitting}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="end_date" className="min-w-32" required />
                        <Input.DatePicker
                            value={getValues("endDate")}
                            onChange={value => setValue("endDate", value)}
                            disabled={isSubmitting}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="start_time" className="min-w-32" required />
                        <Input.TimePicker
                            value={getValues("startTime")}
                            onChange={value => setValue("startTime", value)}
                            disabled={isSubmitting}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="end_time" className="min-w-32" required />
                        <Input.TimePicker
                            value={getValues("endTime")}
                            onChange={value => setValue("endTime", value)}
                            disabled={isSubmitting}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey={schedule ? "save" : "add"}
                            type="submit"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting}
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
