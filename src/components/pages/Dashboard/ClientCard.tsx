/* eslint-disable no-console */
// src/components/pages/Dashboard/ClientCard.tsx
import { Status } from "@components/common"
import { Button } from "@components/template"
import type { T_Client, T_Door } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Eye, Key } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"

interface I_ClientCardProps {
    client: T_Client
    onDoorSelect: (door: T_Door) => void
    setCurrentClient: Function
}

export const ClientCard: FC<I_ClientCardProps> = ({ client, onDoorSelect, setCurrentClient }) => {
    // States and Hooks
    const { token } = client
    const { openModal } = useModal()

    // Render
    return (
        <div className="pb-8 h-full relative">
            <div className="flex h-full flex-col border border-neutral-100 rounded-xl">
                <div className="flex-1 rounded-xl aspect-video mb-4">
                    <div className="w-full h-full rounded-xl bg-zinc-100 flex items-center justify-center" />
                </div>
                {/* Stats */}
                <div className="flex items-end justify-between gap-4 w-full rounded-xl bg-zinc-50 p-3 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-col">
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
                        {client.camera && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setCurrentClient(client)
                                    openModal(Modals.Monitoring.CameraModal)
                                }}
                                className="bg-green-400 rounded-lg p-1 me-auto w-8 h-8 flex items-center justify-center"
                            >
                                <Eye size={16} variant="Bold" className="text-white" />
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-20 aspect-square h-full bg-zinc-200 rounded-lg flex-shrink-0" />
                        <div className="flex flex-col gap-2 items-end">
                            <Status contentKey="not_allowed" variant="error" wrapperClassName="w-full justify-center" />
                            <div>
                                <IranLicensePlate serial="IR60-321b12" className="w-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
