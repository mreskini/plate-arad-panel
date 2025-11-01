import { Modal, Text, useNotify } from "@components/template"
import { API, type T_Schedule } from "@core/api"
import { convertDateToTimeString } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_ScheduleFormData } from "./ScheduleForm"
import { ScheduleForm } from "./ScheduleForm"

interface I_Props {
    callback: Function
    schedule: T_Schedule
}

const CurrentModal = Modals.Management.Schedule.EditSchedule

export const EditScheduleModal: FC<I_Props> = ({ callback, schedule }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (form: I_ScheduleFormData) => {
        const { data, error } = await API.Client.EditSchedule({
            body: {
                token: schedule.token,
                title: form.title,
                start_date: form.startDate ? form.startDate.toDateString() : new Date().toDateString(),
                end_date: form.endDate ? form.endDate.toDateString() : null,
                start_time: form.startTime ? convertDateToTimeString(form.startTime) : "00:00:00",
                end_time: form.endTime ? convertDateToTimeString(form.endTime) : "23:59:59",
            },
        })

        if (data) {
            await callback()
            notify("schedule_edited_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit_schedule" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <ScheduleForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} schedule={schedule} />
        </Modal>
    )
}
