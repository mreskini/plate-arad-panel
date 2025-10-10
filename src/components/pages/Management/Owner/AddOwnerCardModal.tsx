import { Modal, Text, useNotify } from "@components/template"
import type { T_Owner } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { AddOwnerCardForm } from "./AddOwnerCardForm"

interface I_Props {
    callback: Function
    owner: T_Owner
}

const CurrentModal = Modals.Management.Owner.AddCard

export const AddOwnerCardModal: FC<I_Props> = ({ callback, owner }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await callback()
        closeModal(CurrentModal)
        notify("owner_card_assigned_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <div className="flex items-center gap-1">
                    <Text contentKey="assign_card_to" variant="title-1" className="text-neutral-700" weight={600} />
                    <Text
                        content={`${owner.firstname} ${owner.lastname}`}
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
