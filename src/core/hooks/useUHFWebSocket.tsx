/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from "react"

interface I_UHFMessage {
    type: "status" | "data" | "error"
    connected?: boolean
    ascii?: string
    timestamp?: string
    message?: string
}

export const useUHFWebSocket = (clientIp?: string) => {
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState<I_UHFMessage[]>([])
    const [error, setError] = useState<string | null>(null)

    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        if (!clientIp) return

        const wsUrl = import.meta.env.VITE_PUBLIC_WS_URL

        console.log(`🔗 Connecting to UHF WebSocket at ${wsUrl}...`)

        const websocket = new WebSocket(wsUrl)
        wsRef.current = websocket

        websocket.onopen = () => {
            console.log("✅ WebSocket connected")
            setError(null)

            // Auto-connect to UHF reader
            websocket.send("connect")
        }

        websocket.onmessage = (event: MessageEvent) => {
            try {
                const data: I_UHFMessage = JSON.parse(event.data)
                console.log("📥 UHF Data:", data)

                setMessages(prev => [data, ...prev.slice(0, 49)]) // Keep last 50 messages

                if (data.type === "status") {
                    setIsConnected(data.connected || false)
                }

                if (data.type === "error") {
                    setError(data.message || "Unknown error")
                }
            } catch (error: any) {
                console.error("Error parsing WebSocket message:", error)
            }
        }

        websocket.onerror = (event: Event) => {
            console.error("❌ WebSocket error:", event)
            setError("WebSocket connection failed")
            setIsConnected(false)
        }

        websocket.onclose = () => {
            console.log("🔌 WebSocket disconnected")
            setIsConnected(false)
            setError(null)
        }

        return () => {
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.send("disconnect")
                websocket.close()
            }
        }
    }, [clientIp])

    const sendCommand = (command: string) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(command)
        }
    }

    return {
        isConnected,
        messages,
        error,
        sendCommand,
    }
}
