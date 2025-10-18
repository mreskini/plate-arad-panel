import { Button, Modal, Text } from "@components/template"
import type { T_Client } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { ClientTypeKeyMap } from "./static"

interface I_Props {
    client: T_Client
}

const CurrentModal = Modals.Hardware.Client.View

export const ViewClientModal: FC<I_Props> = ({ client }) => {
    // States and hooks
    const { closeModal } = useModal()

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text content={client.name} variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <div className="sm:min-w-lg flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                    <Text contentKey="client_type" ns="input" />
                    <Text contentKey={ClientTypeKeyMap[client.type]} ns="common" />
                </div>

                <div className="flex items-center justify-between">
                    <Text contentKey="pos_number" ns="input" />
                    {client.pos && <Text content={client.pos.num} />}
                </div>

                <div className="flex items-center justify-between">
                    <Text contentKey="ip_address" ns="input" />
                    <Text content={client.ip_address} />
                </div>

                <div className="flex items-center justify-between">
                    <Text contentKey="plate_camera" ns="input" />
                    <Text content={client.plate_cam?.ip ?? "---"} />
                </div>

                <div className="flex items-center justify-between">
                    <Text contentKey="relay_board" ns="input" />
                    <Text content={client.relay?.ip ?? "---"} />
                </div>

                <div>
                    <Button
                        contentKey="close"
                        variant="gray-outline"
                        onClick={() => closeModal(CurrentModal)}
                        className="w-full"
                    />
                </div>
            </div>
        </Modal>
    )
}
