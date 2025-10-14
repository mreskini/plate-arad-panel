import { Modal, Text, useNotify } from "@components/template"
import type { T_Client } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { ClientForm } from "./ClientForm"

interface I_Props {
    callback: Function
    client: T_Client
}

const CurrentModal = Modals.Hardware.Client.Edit

export const EditClientModal: FC<I_Props> = ({ callback, client }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const editClient = async () => {
        await callback()
        notify("client_edited_successfully", "success")
        closeModal(CurrentModal)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <ClientForm onSubmit={editClient} onClose={() => closeModal(CurrentModal)} client={client} />
        </Modal>
    )
}
