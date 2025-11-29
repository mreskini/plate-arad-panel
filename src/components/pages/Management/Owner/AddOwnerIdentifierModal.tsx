import { Modal, Text, useNotify } from "@components/template"
import { API, type T_Customer } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import { AddOwnerIdentifierForm, type I_AddOwnerIdentifierFormData } from "./AddOwnerIdentifierForm"

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
    const onSubmit = async (formValues: I_AddOwnerIdentifierFormData) => {
        // let vehicleImage
        // const file = formValues.imageFile
        // if (file) vehicleImage = await uploadFile(OWNER_VEHICLE_IMAGE_UPLOAD_ROUTE, file)

        const { data, error } = await API.Customer.AddIdentifierToCustomer({
            body: {
                customer_token: owner.token,
                identifier_token: formValues.identifierToken,
            },
        })
        if (data && data.addIdentifierToCustomer) {
            await callback()
            notify("owner_id_assigned_successfully", "success")
            closeModal(CurrentModal)
        }
        if (error) toast.error(error)
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
            <AddOwnerIdentifierForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
