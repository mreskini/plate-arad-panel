import { Button, Input, Spinner } from "@components/template"
import type { T_Schedule } from "@core/api"
import { E_DayOfWeek } from "@core/api"
import { convertTimeStringToDate } from "@core/functions"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { WeekDaysSelect } from "./WeekDaysSelect"

interface I_Props {
    onSubmit: (data: I_ScheduleFormData) => Promise<void>
    onClose: Function
    schedule?: T_Schedule
    allDaysAllowed?: boolean
}

export interface I_ScheduleFormData {
    title: string
    startDate: Date | null
    endDate: Date | null
    startTime: Date | null
    endTime: Date | null
    allowedDays: E_DayOfWeek[]
    isAllDaysAllowed: boolean
}

export const ScheduleForm: FC<I_Props> = ({ onSubmit, onClose, schedule, allDaysAllowed = false }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_ScheduleFormData>({
        mode: "onChange",
        defaultValues: {
            startDate: new Date(),
            startTime: convertTimeStringToDate("00:00:00"),
            endTime: convertTimeStringToDate("23:59:59"),
            allowedDays: [],
            isAllDaysAllowed: allDaysAllowed,
        },
    })

    // Flags
    const isValid = watch("title") && watch("startDate") && watch("startTime") && watch("endTime")
    const isAllDaysAllowed = watch("isAllDaysAllowed")

    // Methods
    const init = async () => {
        formDataBinding()
        setValue("isAllDaysAllowed", allDaysAllowed)
        setIsFetching(false)
    }

    const formDataBinding = () => {
        if (!schedule) return

        setValue("title", schedule.title)
        setValue("startDate", schedule.start_date ? new Date(schedule.start_date) : new Date())
        setValue("endDate", schedule.end_date ? new Date(schedule.end_date) : null)

        setValue(
            "startTime",
            schedule.start_time ? convertTimeStringToDate(schedule.start_time) : convertTimeStringToDate("00:00:00")
        )

        setValue(
            "endTime",
            schedule.end_time ? convertTimeStringToDate(schedule.end_time) : convertTimeStringToDate("23:59:59")
        )

        setValue("allowedDays", schedule.allowed_days)
    }

    // Use effects
    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (isAllDaysAllowed)
            setValue("allowedDays", [
                E_DayOfWeek.Saturday,
                E_DayOfWeek.Sunday,
                E_DayOfWeek.Monday,
                E_DayOfWeek.Tuesday,
                E_DayOfWeek.Wednesday,
                E_DayOfWeek.Thursday,
                E_DayOfWeek.Friday,
            ])
    }, [isAllDaysAllowed])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-xl flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}
            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-xl grid gap-4 grid-cols-2">
                    <div className="flex w-full items-center gap-2 col-span-2">
                        <Input.Label labelKey="title" className="min-w-24" required />
                        <Input
                            placeholder="enter_schedule_title_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("title", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 col-span-1">
                        <Input.Label labelKey="start_date" className="min-w-24" required />
                        <Input.DatePicker
                            value={watch("startDate")}
                            onChange={(value: Date | null) => setValue("startDate", value)}
                            disabled={isSubmitting}
                            className="w-full"
                            clearable
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="end_date" className="min-w-24" />
                        <Input.DatePicker
                            value={watch("endDate")}
                            onChange={(value: Date | null) => setValue("endDate", value)}
                            disabled={isSubmitting}
                            className="w-full"
                            clearable
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="start_time" className="min-w-24" required />
                        <Input.TimePicker
                            value={watch("startTime")}
                            onChange={(value: Date | null) => setValue("startTime", value)}
                            disabled={isSubmitting}
                            className="w-full"
                            clearable
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input.Label labelKey="end_time" className="min-w-24" required />
                        <Input.TimePicker
                            value={watch("endTime")}
                            onChange={(value: Date | null) => setValue("endTime", value)}
                            disabled={isSubmitting}
                            className="w-full"
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                        <Input.Label labelKey="traffic_days" className="min-w-24" />

                        <WeekDaysSelect
                            selected={watch("allowedDays")}
                            setSelected={values => setValue("allowedDays", values)}
                            disabled={isSubmitting || isAllDaysAllowed}
                            className="w-full"
                        />

                        <Input.Checkbox
                            labelKey="all_days"
                            checked={watch("isAllDaysAllowed")}
                            onChange={e => setValue("isAllDaysAllowed", e.target.checked)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <Button
                            contentKey={schedule ? "save" : "add"}
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
