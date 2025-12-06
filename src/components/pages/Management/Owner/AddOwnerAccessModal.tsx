import { Modal, Text, useNotify } from "@components/template"
import { API, type T_Customer } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_AddOwnerAccessFormData } from "./AddOwnerAccessForm"
import { AddOwnerAccessForm } from "./AddOwnerAccessForm"

interface I_Props {
    callback: Function
    owner: T_Customer
}

const CurrentModal = Modals.Owner.AddAccess

export const AddOwnerAccessModal: FC<I_Props> = ({ callback, owner }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (formValues: I_AddOwnerAccessFormData) => {
        const { data, error } = await API.Customer.UpdateCustomerAccess({
            body: {
                customer_token: owner.token,
                access_control_token: formValues.accessControlToken,
            },
        })

        if (data && data.updateCustomerAccess) {
            await callback()
            notify("owner_access_level_updated_successfully", "success")
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
                    <Text contentKey="assign_access_to" variant="title-1" className="text-neutral-700" weight={600} />
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
            <AddOwnerAccessForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
