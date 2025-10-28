import { Modal, Text, useNotify } from "@components/template"
import { API, type T_User, USER_PROFILE_IMAGE_UPLOAD_ROUTE } from "@core/api"
import { uploadFile } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_UserFormData } from "./UserForm"
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
    const onSubmit = async (formValues: I_UserFormData) => {
        let profileImage
        const file = formValues.profileImageFile
        if (file) profileImage = await uploadFile(USER_PROFILE_IMAGE_UPLOAD_ROUTE, file)

        const { data, error } = await API.User.EditUser({
            body: {
                token: user.token,
                username: formValues.username.trim(),
                password: formValues.password.trim(),
                fullname: formValues.fullname.trim(),
                role_token: formValues.roleToken,
                expiration_date: formValues.expirationDate.toDateString(),
                ...(profileImage && { profile_image_url: profileImage.url }),
            },
        })
        if (data && data.editUser) {
            await callback()
            notify("user_edited_successfully", "success")
            closeModal(CurrentModal)
        }
        if (error) toast.error(error)
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
