/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import type { FC } from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface I_UHFMessage {
    type: "status" | "data" | "error"
    token?: string
    connected?: boolean
    ascii?: string
    hex?: string
    timestamp?: string
    message?: string
}

interface I_DeviceConnection {
    token: string
    ip: string
    port: number
    isConnected: boolean
}

interface I_UHFWebSocketContextType {
    connectDevice: (token: string, ip: string, port: number) => void
    disconnectDevice: (token: string) => void
    messages: I_UHFMessage[]
    connections: Record<string, boolean>
    isConnected: boolean
}

const UHFWebSocketContext = createContext<I_UHFWebSocketContextType>({
    connectDevice: () => {},
    disconnectDevice: () => {},
    messages: [],
    connections: {},
    isConnected: false,
})

export const useUHFWebSocket = () => useContext(UHFWebSocketContext)

interface I_Props {
    children: React.ReactNode
}

export const UHFWebSocketProvider: FC<I_Props> = ({ children }) => {
    const [messages, setMessages] = useState<I_UHFMessage[]>([])
    const [connections, setConnections] = useState<Record<string, boolean>>({})
    const [isConnected, setIsConnected] = useState(false)

    const wsRef = useRef<WebSocket | null>(null)
    const deviceConfigsRef = useRef<I_DeviceConnection[]>([])

    useEffect(() => {
        const wsUrl = import.meta.env.VITE_PUBLIC_WS_URL || "ws://localhost:3456"

        console.log("🔗 Initializing WebSocket connection...")

        const websocket = new WebSocket(wsUrl)
        wsRef.current = websocket

        websocket.onopen = () => {
            console.log("✅ WebSocket connected")
            setIsConnected(true)

            // Reconnect all previously connected devices
            deviceConfigsRef.current.forEach(device => {
                if (device.isConnected) {
                    websocket.send(
                        JSON.stringify({
                            action: "connect",
                            token: device.token,
                            ip: device.ip,
                            port: device.port,
                        })
                    )
                }
            })
        }

        websocket.onmessage = (event: MessageEvent) => {
            try {
                const data: I_UHFMessage = JSON.parse(event.data)
                console.log("📥 UHF Message:", data)

                // Update state
                setMessages(prev => [data, ...prev.slice(0, 199)]) // Keep last 200

                if (data.type === "status" && data.token) {
                    setConnections(prev => ({
                        ...prev,
                        [data.token!]: data.connected || false,
                    }))

                    // Update device configs
                    const deviceIndex = deviceConfigsRef.current.findIndex(d => d.token === data.token)
                    if (deviceIndex !== -1) {
                        deviceConfigsRef.current[deviceIndex].isConnected = data.connected || false
                    }
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error)
            }
        }

        websocket.onerror = (event: Event) => {
            console.error("❌ WebSocket error:", event)
            setIsConnected(false)
        }

        websocket.onclose = () => {
            console.log("🔌 WebSocket disconnected")
            setIsConnected(false)
            setConnections({})
        }

        return () => {
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify({ action: "disconnect-all" }))
                websocket.close()
            }
        }
    }, [])

    const connectDevice = (token: string, ip: string, port: number) => {
        console.log("Connecting ====> ")
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected")
            return
        }
        console.log(token, ip, port)

        // Store device config
        const existingIndex = deviceConfigsRef.current.findIndex(d => d.token === token)
        if (existingIndex === -1) deviceConfigsRef.current.push({ token, ip, port, isConnected: true })
        else deviceConfigsRef.current[existingIndex] = { token, ip, port, isConnected: true }

        wsRef.current.send(JSON.stringify({ action: "connect", token, ip, port }))
    }

    const disconnectDevice = (token: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return

        // Remove from configs
        deviceConfigsRef.current = deviceConfigsRef.current.filter(d => d.token !== token)

        // Send disconnect command
        wsRef.current.send(JSON.stringify({ action: "disconnect", token }))
    }

    const value = {
        connectDevice,
        disconnectDevice,
        messages,
        connections,
        isConnected,
    }

    return <UHFWebSocketContext.Provider value={value}>{children}</UHFWebSocketContext.Provider>
}
