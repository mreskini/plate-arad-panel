import axios from "axios"
import { useEffect, useState } from "react"

const BASE_API_URL = import.meta.env.VITE_PUBLIC_BASE_API_URL

interface I_UseStream {
    username: string
    password: string
    ip: string
    brand: string
    channel: number
}

export const useStream = ({ username, password, ip, channel, brand }: I_UseStream) => {
    // States and Hooks
    const [streamUrl, setStreamUrl] = useState<string | null>(null)
    const [isStarted, setIsStarted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Methods
    const fetchStreamUrl = async () => {
        try {
            setIsLoading(true)
            const body = { username, password, ip, brand, channel }
            const { data } = await axios.post<{ url: string }>(`${BASE_API_URL}/stream/start`, body)
            if (data) {
                const response = data.url
                setStreamUrl(response)
            }
        } catch (error) {
            setStreamUrl(null)
        } finally {
            setIsStarted(true)
            setIsLoading(false)
        }
    }

    // Use effects
    useEffect(() => {
        if (!username || !password || !ip || !channel) return
        fetchStreamUrl()
    }, [])

    // Render
    return {
        streamUrl,
        isStarted,
        isLoading,
    }
}
