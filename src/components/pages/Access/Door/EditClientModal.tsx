import { Modal, Text, useNotify } from "@components/template"
import { API, type T_Client } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_ClientFormData } from "./ClientForm"
import { ClientForm } from "./ClientForm"

interface I_Props {
    callback: Function
    client: T_Client
}

const CurrentModal = Modals.Access.Door.Edit

export const EditClientModal: FC<I_Props> = ({ callback, client }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const editClient = async (form: I_ClientFormData) => {
        const { data, error } = await API.Client.EditClient({
            body: {
                token: client.token,
                name: form.name,
                type: form.type,
                camera_token: form.camera_token,
                relay_token: form.relay_token,
                reader_token: form.reader_token,
            },
        })

        if (data) {
            await callback()
            notify("client_edited_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit_client" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <ClientForm onSubmit={editClient} onClose={() => closeModal(CurrentModal)} client={client} />
        </Modal>
    )
}
