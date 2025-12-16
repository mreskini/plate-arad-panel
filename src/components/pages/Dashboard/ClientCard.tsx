import { Button, Text } from "@components/template"
import type { T_Client, T_Door, T_LastTraffic } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import clsx from "clsx"
import { Eye, Key } from "iconsax-reactjs"
import { type FC, useState } from "react"

import { ClientTraffics } from "./ClientTraffics"
import { LastTrafficView } from "./LastTrafficView"

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
            <div className="flex h-full flex-col border border-neutral-100 rounded-2xl">
                {/* Selected traffic */}
                {selectedTraffic && (
                    <div
                        className={clsx([
                            "flex items-end justify-between gap-12 w-full rounded-t-2xl p-3 flex-shrink-0",
                            selectedTraffic.authorized ? "bg-emerald-500/20" : "bg-red-500/10",
                        ])}
                    >
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
                        <LastTrafficView last={selectedTraffic} />
                    </div>
                )}

                {/* Recent traffics go here */}
                <div className="w-full">
                    <ClientTraffics selected={selectedTraffic} client={client} setSelected={setSelectedTraffic} />
                </div>
            </div>
        </div>
    )
}
