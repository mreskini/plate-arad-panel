import { Modal, Text, useNotify } from "@components/template"
import { API, type T_Door } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_OpenDoorFormData } from "./OpenDoorForm"
import { OpenDoorForm } from "./OpenDoorForm"

interface I_Props {
    door: T_Door
}

const CurrentModal = Modals.Monitoring.OpenDoor

export const OpenDoorModal: FC<I_Props> = ({ door }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (formValues: I_OpenDoorFormData) => {
        const { data, error } = await API.Customer.CreateUnauthorizedTraffic({
            body: {
                client_token: formValues.token,
                description: formValues.descriptions,
            },
        })

        if (data?.createUnauthorizedTraffic) {
            notify("door_opened_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
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
