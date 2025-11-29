import { Modal, Text, useNotify } from "@components/template"
import type { T_Customer } from "@core/api"
import { API, USER_PROFILE_IMAGE_UPLOAD_ROUTE } from "@core/api"
import { uploadFile } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_OwnerFormData } from "./OwnerForm"
import { OwnerForm } from "./OwnerForm"

interface I_Props {
    callback: Function
    owner: T_Customer
}

const CurrentModal = Modals.Owner.Edit

export const EditOwnerModal: FC<I_Props> = ({ callback, owner }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (formValues: I_OwnerFormData) => {
        let profileImage
        const file = formValues.profileImageFile
        if (file) profileImage = await uploadFile(USER_PROFILE_IMAGE_UPLOAD_ROUTE, file)

        const { data, error } = await API.Customer.EditCustomer({
            body: {
                token: owner.token,
                first_name: formValues.firstname.trim(),
                last_name: formValues.lastname.trim(),
                mobile: formValues.phoneNumber.trim(),
                national_code: formValues.nationalCode.trim(),
                ...(formValues.descriptions && { description: formValues.descriptions.trim() }),
                ...(profileImage && { image_url: profileImage.url }),
            },
        })

        if (data && data.editCustomer) {
            await callback()
            notify("owner_edited_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
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
