import { Modal, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_ClientFormData } from "./ClientForm"
import { ClientForm } from "./ClientForm"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Hardware.Client.Add

export const AddClientModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const createClient = async (form: I_ClientFormData) => {
        const { data, error } = await API.Client.CreateClient({
            body: {
                name: form.name,
                type: form.type,
                camera_token: form.camera_token,
                relay_token: form.relay_token,
            },
        })

        if (data) {
            await callback()
            notify("client_added_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add_client" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <ClientForm onSubmit={createClient} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
