import { Button, Modal, Text } from "@components/template"
import type { T_Client } from "@core/api"
import { stopCameraStream } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { CameraViewer } from "./CameraViewer"

const CurrentModal = Modals.Monitoring.CameraModal

interface I_Props {
    client: T_Client
}

export const ClientCameraModal: FC<I_Props> = ({ client }) => {
    // States and Hooks
    const { closeModal } = useModal()

    // Methods
    const onCloseClick = () => {
        if (client && client.camera && client.camera.ip) stopCameraStream(client.camera.ip)
        closeModal(CurrentModal)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text content="" variant="title-1" className="text-neutral-700" weight={600} />}
        >
            <div className="w-2xl">
                <div>{client.camera && <CameraViewer client={client} />}</div>
                <div className="mt-10">
                    <Button contentKey="close" onClick={onCloseClick} variant="gray-outline" className="w-full" />
                </div>
            </div>
        </Modal>
    )
}
