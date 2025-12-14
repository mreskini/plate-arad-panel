/* eslint-disable no-console */
// src/components/pages/Dashboard/ClientCard.tsx
import { Status } from "@components/common"
import { CameraViewer } from "@components/pages/Dashboard"
import { Button, Text } from "@components/template"
import type { T_Client, T_Door } from "@core/api"
import { useUHFWebSocket } from "@core/contexts"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Key } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"
import { useEffect, useMemo, useRef } from "react"

interface I_ClientCardProps {
    client: T_Client
    onDoorSelect: (door: T_Door) => void
}

export const ClientCard: FC<I_ClientCardProps> = ({ client, onDoorSelect }) => {
    // States and Hooks
    // TODO: Add the port to the reader device
    const { openModal } = useModal()
    const { connectDevice, messages, connections } = useUHFWebSocket()

    // Device configuration
    const { token } = client
    const deviceIp = client.reader?.ip ?? "192.168.20.240"
    const devicePort = 100
    const hasConnectedRef = useRef(false)

    const isConnected = connections[token] || false

    const deviceMessages = useMemo(() => messages.filter(msg => msg.token === token), [messages, token])

    useEffect(() => {
        if (hasConnectedRef.current) return
        hasConnectedRef.current = true

        connectDevice(token, deviceIp, devicePort)
        console.log(`🔗 Connecting to ${client.name} (${deviceIp}:${devicePort})`)
    }, [])

    // Log device messages to console
    useEffect(() => {
        if (deviceMessages.length > 0) {
            const latestMessage = deviceMessages[0]
            console.log(`📡 ${client.name}:`, latestMessage)

            // You can trigger actions based on RFID data here
            if (latestMessage.type === "data" && latestMessage.ascii) {
                console.log(`🏷️ RFID data from ${client.name}:`, latestMessage.ascii)

                // Example: Trigger door opening on specific tag
                if (latestMessage.ascii.includes("VALID_TAG")) {
                    console.log(`🚪 Triggering door for ${client.name}...`)
                    // Your door opening logic here
                }
            }
        }
    }, [deviceMessages, client.name])

    // useEffect(() => {
    //     return () => {
    //         if (client && client.camera && client.camera.ip) stopCameraStream(client.camera.ip)
    //     }
    // }, [])

    // Render
    return (
        <div className="pb-8 h-full relative">
            <div className="flex h-full flex-col border border-neutral-100 rounded-xl">
                {/* UHF Reader Status Indicator */}
                <div className="flex items-center gap-1.5 absolute right-2 top-2 z-10 bg-zinc-200/30 rounded-full py-1.5 px-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                    <Text variant="meta-1" contentKey="reader" weight={600} />
                </div>

                {/* Latest RFID Data Display */}
                {deviceMessages[0]?.type === "data" && deviceMessages[0].ascii && (
                    <div className="absolute left-2 top-2 z-10 bg-zinc-200/30 rounded-full py-1 px-3">
                        <Text content={deviceMessages[0].ascii} variant="meta-1" className="text-zinc-700 truncate" />
                    </div>
                )}

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
