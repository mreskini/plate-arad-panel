/* eslint-disable no-console */
import axios from "axios"

export const stopCameraStream = async (ip: string) => {
    if (ip) {
        try {
            await axios.post(
                `${import.meta.env.VITE_PUBLIC_BASE_API_URL}/stream/stop`,
                { ip },
                { headers: { "Content-Type": "application/json" } }
            )
        } catch (error) {
            console.error("Failed to stop camera stream:", error)
        }
    }
}
