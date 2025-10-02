import { Modal, Text, useNotify } from "@components/template"
import { sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { OwnerForm } from "./OwnerForm"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Management.Owner.AddOwner

export const AddOwnerModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await sleep(2000)
        await callback()
        closeModal(CurrentModal)
        notify("owner_added_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add_owner" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <OwnerForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
