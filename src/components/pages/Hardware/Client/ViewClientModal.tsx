import { Button, Divider, Modal, Text } from "@components/template"
import type { T_Client } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { CameraBrandOptions } from "../Device"
import { ClientTypeKeyMap } from "./static"

interface I_Props {
    client: T_Client
}

const CurrentModal = Modals.Access.Client.View

export const ViewClientModal: FC<I_Props> = ({ client }) => {
    // States and hooks
    const { closeModal } = useModal()
    const CameraBrand = CameraBrandOptions.find(_ => _.value === client.camera?.brand_name)?.labelKey

    // Flags
    const isCameraAvailable = client.camera?.token
    const isRelayAvailable = client.relay?.token
    const isReaderAvailable = client.reader?.token

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text content={client.name} variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <div className="sm:min-w-lg flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <Text contentKey="client_type" ns="input" />
                    <Text contentKey={ClientTypeKeyMap[client.type]} />
                </div>

                {isCameraAvailable && (
                    <>
                        <Divider />

                        <div className="flex items-center justify-between">
                            <Text contentKey="camera_name" ns="input" />
                            <Text content={client.camera?.name} variant="meta-1" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="camera_brand" ns="input" />
                            {client.camera?.brand_name && <Text contentKey={CameraBrand} variant="meta-1" ns="input" />}
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="camera_ip" ns="input" />
                            <Text content={client.camera?.ip} variant="meta-1" className="font-courier" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="username" />
                            <Text content={client.camera?.username!} variant="meta-1" className="font-courier" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="password" />
                            <Text content={client.camera?.password!} variant="meta-1" className="font-courier" />
                        </div>
                    </>
                )}

                {isRelayAvailable && (
                    <>
                        <Divider />

                        <div className="flex items-center justify-between">
                            <Text contentKey="controller_name" ns="input" />
                            <Text content={client.relay?.name} variant="meta-1" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="controller_channel_number" ns="tables" />

                            {client.relay?.channel === 0 && <Text contentKey="zero" variant="meta-2" />}
                            {client.relay?.channel === 1 && <Text contentKey="one" variant="meta-2" />}
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="controller_ip" ns="tables" />
                            <Text content={client.relay?.ip} variant="meta-1" className="font-courier" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="username" />
                            <Text content={client.relay?.username!} variant="meta-1" className="font-courier" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="password" />
                            <Text content={client.relay?.password!} variant="meta-1" className="font-courier" />
                        </div>
                    </>
                )}

                {isReaderAvailable && (
                    <>
                        <Divider />

                        <div className="flex items-center justify-between">
                            <Text contentKey="reader_name" ns="input" />
                            <Text content={client.reader?.name} variant="meta-1" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="reader_ip" ns="tables" />
                            <Text content={client.reader?.ip} variant="meta-1" className="font-courier" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="username" />
                            <Text content={client.reader?.username!} variant="meta-1" className="font-courier" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Text contentKey="password" />
                            <Text content={client.reader?.password!} variant="meta-1" className="font-courier" />
                        </div>
                    </>
                )}

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
