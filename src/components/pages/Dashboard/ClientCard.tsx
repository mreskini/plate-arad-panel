/* eslint-disable no-console */
// src/components/pages/Dashboard/ClientCard.tsx
import { Status } from "@components/common"
import { CameraViewer } from "@components/pages/Dashboard"
import { Button } from "@components/template"
import type { T_Client, T_Door } from "@core/api"
import { stopCameraStream } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Key } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"
import { useEffect } from "react"

interface I_ClientCardProps {
    client: T_Client
    onDoorSelect: (door: T_Door) => void
}

export const ClientCard: FC<I_ClientCardProps> = ({ client, onDoorSelect }) => {
    // States and Hooks
    const { openModal } = useModal()
    const { token } = client

    useEffect(() => {
        return () => {
            if (client && client.camera && client.camera.ip) stopCameraStream(client.camera.ip)
        }
    }, [])

    // Render
    return (
        <div className="pb-8 h-full relative">
            <div className="flex h-full flex-col border border-neutral-100 rounded-xl">
                {/* Camera */}
                <div className="mb-4">
                    {client.camera && <CameraViewer client={client} />}
                    {!client.camera && (
                        <div className="flex-1 rounded-xl aspect-video">
                            <div className="w-full h-full rounded-xl bg-zinc-100 flex items-center justify-center" />
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-end justify-end gap-4 w-full rounded-xl bg-zinc-50 p-3 flex-shrink-0">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onDoorSelect({ token, name: client.name })
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
