import { Modal, Text, useNotify } from "@components/template"
import type { T_Schedule } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

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
    const onSubmit = async () => {
        await callback()
        closeModal(CurrentModal)
        notify("schedule_edited_successfully", "success")
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
