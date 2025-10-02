import { Modal, Text, useNotify } from "@components/template"
import type { T_User } from "@core/api"
import { sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { UserForm } from "./UserForm"

interface I_Props {
    callback: Function
    user: T_User
}

const CurrentModal = Modals.Management.User.EditUser

export const EditUserModal: FC<I_Props> = ({ callback, user }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async () => {
        await sleep(2000)
        await callback()
        closeModal(CurrentModal)
        notify("user_edited_successfully", "success")
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit_user" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <UserForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} user={user} />
        </Modal>
    )
}
