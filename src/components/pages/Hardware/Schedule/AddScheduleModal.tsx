import { Modal, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { convertDateToTimeString } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_ScheduleFormData } from "./ScheduleForm"
import { ScheduleForm } from "./ScheduleForm"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Access.Schedule.Add

export const AddScheduleModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (form: I_ScheduleFormData) => {
        const { data, error } = await API.Client.CreateSchedule({
            body: {
                title: form.title,
                start_date: form.startDate ? form.startDate.toDateString() : new Date().toDateString(),
                end_date: form.endDate ? form.endDate.toDateString() : null,
                start_time: form.startTime ? convertDateToTimeString(form.startTime) : "00:00:00",
                end_time: form.endTime ? convertDateToTimeString(form.endTime) : "23:59:59",
                allowed_days: form.allowedDays,
            },
        })

        if (data) {
            await callback()
            notify("schedule_added_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add_schedule" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <ScheduleForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} allDaysAllowed />
        </Modal>
    )
}
