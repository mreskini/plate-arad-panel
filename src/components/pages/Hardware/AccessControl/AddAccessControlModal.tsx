import { Modal, Text, useNotify } from "@components/template"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { AccessControlForm } from "./AccessControlForm"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Management.AccessControl.AddAccessControl

export const AddAccessControlModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await callback()
        closeModal(CurrentModal)
        notify("access_control_added_successfully", "success")
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
