/* eslint-disable no-console */
// src/components/pages/Dashboard/ClientCard.tsx
import { Status } from "@components/common"
import { CameraViewer } from "@components/pages/Dashboard"
import { Button, Text } from "@components/template"
import type { T_Client, T_Door } from "@core/api"
import { useUHFWebSocket } from "@core/hooks"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Key } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"

interface I_ClientCardProps {
    client: T_Client
    onDoorSelect: (door: T_Door) => void
}

export const ClientCard: FC<I_ClientCardProps> = ({ client, onDoorSelect }) => {
    // States and Hooks
    const { openModal } = useModal()
    // TODO: Make this connection dynamic
    const { isConnected, messages } = useUHFWebSocket("192.168.20.87")

    if (messages.length > 0) {
        const latestMessage = messages[0]
        console.log(`📡 ${client.name}:`, latestMessage)
    }

    // Render
    return (
        <div className="pb-8 h-full relative">
            <div className="flex h-full flex-col border border-neutral-100 rounded-xl">
                <div className="flex items-center gap-1.5 absolute right-2 top-2 z-10 bg-zinc-200/30 rounded-full py-1.5 px-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                    <Text variant="meta-1" contentKey="reader" weight={600} />
                </div>

                <div className="mb-4">
                    {client.camera && <CameraViewer client={client} />}
                    {!client.camera && (
                        <div className="flex-1 rounded-xl aspect-video">
                            <div className="w-full h-full rounded-xl bg-zinc-100 flex items-center justify-center" />
                        </div>
                    )}
                </div>

                <div className="flex items-end justify-end gap-4 w-full rounded-xl bg-zinc-50 p-3 flex-shrink-0">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onDoorSelect({ token: "door-token", name: "گذرگاه اصلی" })
                            openModal(Modals.Monitoring.OpenDoor)
                        }}
                        className="bg-red-400 rounded-lg p-1 me-auto w-8 h-8 flex items-center justify-center"
                    >
                        <Key size={16} variant="Bold" className="text-white" />
                    </Button>

                    <div className="w-auto aspect-square h-full bg-zinc-200 rounded-lg flex-shrink-0" />

                    <div className="flex flex-col gap-2 items-end">
                        <Status contentKey="not_allowed" variant="error" wrapperClassName="w-full justify-center" />
                        <div>
                            <IranLicensePlate serial="IR60-321b12" className="w-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
