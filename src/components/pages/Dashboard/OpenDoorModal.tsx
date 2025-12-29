import { Modal, Text, useNotify } from "@components/template"
import type { T_Client } from "@core/api"
import { API } from "@core/api"
import { fetchCameraFrame, uploadFile } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { toast } from "react-toastify"

import type { I_OpenDoorFormData } from "./OpenDoorForm"
import { OpenDoorForm } from "./OpenDoorForm"

interface I_Props {
    door: T_Client
}

const CurrentModal = Modals.Monitoring.OpenDoor

export const OpenDoorModal: FC<I_Props> = ({ door }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    // Methods
    const onSubmit = async (formValues: I_OpenDoorFormData) => {
        // 1. First, we try to access the image for this traffic
        let imageUrl = null
        if (door?.camera?.ip) {
            const { ip } = door.camera
            const file = await fetchCameraFrame(ip)
            if (file) {
                const { url } = await uploadFile(`${import.meta.env.VITE_PUBLIC_BASE_UPLOAD_URL}/traffic/image`, file)
                imageUrl = url
            }
        }

        // 2. We try to create the traffic
        const { data, error } = await API.Customer.CreateUnauthorizedTraffic({
            body: {
                client_token: formValues.token,
                description: formValues.descriptions,
                ...(imageUrl && { plate_image: imageUrl }),
            },
        })

        // 3. Notify the user
        if (data && data.createUnauthorizedTraffic) {
            notify("door_opened_successfully", "success")
            await API.Client.OpenClientGate({ body: { token: formValues.token } })
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
                    <Text contentKey="open_door" variant="title-1" className="text-neutral-700" weight={600} />
                </div>
            }
            closeButton
        >
            <OpenDoorForm onSubmit={onSubmit} onClose={() => closeModal(CurrentModal)} door={door} />
        </Modal>
    )
}
