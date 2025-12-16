import { Status } from "@components/common"
import { Button, Text } from "@components/template"
import type { T_Client, T_Door, T_LastTraffic } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Eye, Key } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { type FC, useState } from "react"

import { ClientTraffics } from "./ClientTraffics"

interface I_ClientCardProps {
    client: T_Client
    onDoorSelect: (door: T_Door) => void
    setCurrentClient: Function
}

export const ClientCard: FC<I_ClientCardProps> = ({ client, onDoorSelect, setCurrentClient }) => {
    // States and Hooks
    const { token } = client
    const { openModal } = useModal()
    const [selectedTraffic, setSelectedTraffic] = useState<T_LastTraffic | null>(null)

    // Render
    return (
        <div className="pb-8 h-full relative">
            <div className="flex h-full flex-col border border-neutral-100 rounded-xl">
                {/* Selected traffic */}
                {selectedTraffic && (
                    <div className="flex items-end justify-between gap-4 w-full rounded-xl bg-zinc-50 p-3 flex-shrink-0">
                        <div className="flex flex-col justify-between h-full">
                            <div className="pt-1">
                                <Text content={client.name} weight={600} variant="title-1" className="text-blue-500" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        onDoorSelect({ token, name: client.name })
                                        openModal(Modals.Monitoring.OpenDoor)
                                    }}
                                    className="bg-red-400 rounded-lg p-1 w-8 h-8 flex items-center justify-center"
                                >
                                    <Key size={16} variant="Bold" className="text-white" />
                                </Button>
                                {client.camera && (
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setCurrentClient(client)
                                            openModal(Modals.Monitoring.CameraModal)
                                        }}
                                        className="bg-green-400 rounded-lg p-1 w-8 h-8 flex items-center justify-center"
                                    >
                                        <Eye size={16} variant="Bold" className="text-white" />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {selectedTraffic.customer && selectedTraffic.customer.image_url ? (
                                <img
                                    src={selectedTraffic.customer.image_url}
                                    className="w-20 aspect-square h-full rounded-lg"
                                    alt={`${selectedTraffic.token}`}
                                />
                            ) : (
                                <div className="w-20 aspect-square h-full bg-zinc-200 rounded-lg flex-shrink-0" />
                            )}
                            <div className="flex flex-col gap-2 items-end">
                                {!selectedTraffic.authorized && (
                                    <Status
                                        contentKey="not_allowed"
                                        variant="error"
                                        wrapperClassName="w-full justify-center"
                                    />
                                )}
                                {selectedTraffic.authorized && (
                                    <Status
                                        contentKey="allowed"
                                        variant="success"
                                        wrapperClassName="w-full justify-center"
                                    />
                                )}
                                <div>
                                    <IranLicensePlate serial="IR60-321b12" className="w-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent traffics go here */}
                <div className="w-full">
                    <ClientTraffics client={client} setSelected={setSelectedTraffic} />
                </div>
            </div>
        </div>
    )
}
