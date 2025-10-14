import { Modal, Text, useNotify } from "@components/template"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { init } from "i18next"
import { type FC, useEffect } from "react"

import { ClientForm } from "./ClientForm"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Hardware.Client.Add

export const AddClientModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const createClient = async () => {
        await callback()
        notify("client_added_successfully", "success")
        closeModal(CurrentModal)
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add_new_client" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <ClientForm onSubmit={createClient} onClose={() => closeModal(CurrentModal)} />
        </Modal>
    )
}
