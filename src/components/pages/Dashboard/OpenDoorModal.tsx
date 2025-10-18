import { Modal, Text, useNotify } from "@components/template"
import type { T_Door } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { OpenDoorForm } from "./OpenDoorForm"

interface I_Props {
    callback: Function
    door: T_Door
}

const CurrentModal = Modals.Monitoring.OpenDoor

export const OpenDoorModal: FC<I_Props> = ({ callback, door }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await callback()
        closeModal(CurrentModal)
        notify("door_opened_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <div className="flex items-center gap-1">
                    <Text contentKey="open_door" variant="title-1" className="text-neutral-700" weight={600} />
                </div>
            }
            closeButton
        >
            <OpenDoorForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} door={door} />
        </Modal>
    )
}
