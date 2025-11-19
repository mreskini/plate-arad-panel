import { Modal, Text, useNotify } from "@components/template"
import type { T_Customer } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { AddOwnerCardForm } from "./AddOwnerCardForm"

interface I_Props {
    callback: Function
    owner: T_Customer
}

const CurrentModal = Modals.Owner.AddIdentifier

export const AddOwnerIdentifierModal: FC<I_Props> = ({ callback, owner }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await callback()
        closeModal(CurrentModal)
        notify("owner_id_assigned_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <div className="flex items-center gap-1">
                    <Text contentKey="assign_id_to" variant="title-1" className="text-neutral-700" weight={600} />
                    <Text
                        content={`${owner.first_name} ${owner.last_name}`}
                        variant="title-1"
                        className="text-neutral-700"
                        weight={600}
                    />
                </div>
            }
            closeButton
        >
            <AddOwnerCardForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
