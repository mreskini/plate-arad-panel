import { Modal, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_AccessControlFormData } from "./AccessControlForm"
import { AccessControlForm } from "./AccessControlForm"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Access.AccessControl.Add

export const AddAccessControlModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (form: I_AccessControlFormData) => {
        const { data, error } = await API.Client.CreateAccessControl({
            body: {
                client_token: form.clientToken,
                schedule_token: form.scheduleToken,
                title: form.title,
            },
        })

        if (data) {
            await callback()
            notify("access_control_added_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add_access_control" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <AccessControlForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
