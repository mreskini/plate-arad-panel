import { Modal, Text, useNotify } from "@components/template"
import type { T_AccessControl } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { AccessControlForm } from "./AccessControlForm"

interface I_Props {
    callback: Function
    accessControl: T_AccessControl
}

const CurrentModal = Modals.Management.AccessControl.EditAccessControl
export const EditAccessControlModal: FC<I_Props> = ({ callback, accessControl }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await callback()
        closeModal(CurrentModal)
        notify("access_control_edited_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <Text contentKey="edit_access_control" variant="title-1" className="text-neutral-700" weight={600} />
            }
            closeButton
        >
            <AccessControlForm
                onSubmit={onSubmit}
                onClose={() => closeModal(CurrentModal)}
                accessControl={accessControl}
            />
        </Modal>
    )
}
