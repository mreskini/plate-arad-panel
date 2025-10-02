import { Modal, Text, useNotify } from "@components/template"
import type { T_Owner } from "@core/api"
import { sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { OwnerForm } from "./OwnerForm"

interface I_Props {
    callback: Function
    owner: T_Owner
}

const CurrentModal = Modals.Management.Owner.EditOwner

export const EditOwnerModal: FC<I_Props> = ({ callback, owner }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await sleep(2000)
        await callback()
        closeModal(CurrentModal)
        notify("owner_edited_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit_owner" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <OwnerForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} owner={owner} />
        </Modal>
    )
}
