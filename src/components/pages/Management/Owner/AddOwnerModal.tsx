import { Modal, Text, useNotify } from "@components/template"
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
}

const CurrentModal = Modals.Management.Owner.AddOwner

export const AddOwnerModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (formValues: I_OwnerFormData) => {
        let profileImage
        const file = formValues.profileImageFile
        if (file) profileImage = await uploadFile(USER_PROFILE_IMAGE_UPLOAD_ROUTE, file)

        const { data, error } = await API.Customer.CreateCustomer({
            body: {
                first_name: formValues.firstname.trim(),
                last_name: formValues.lastname.trim(),
                mobile: formValues.phoneNumber.trim(),
                national_code: formValues.nationalCode.trim(),
                ...(formValues.descriptions && { description: formValues.descriptions.trim() }),
                ...(profileImage && { profile_image_url: profileImage.url }),
            },
        })

        if (data && data.createCustomer) {
            await callback()
            notify("owner_added_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
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
