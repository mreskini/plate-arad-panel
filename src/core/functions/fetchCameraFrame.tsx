import axios from "axios"

const ServerBase = import.meta.env.VITE_PUBLIC_SERVER_BASE

export async function fetchCameraFrame(cameraIp: string): Promise<File | null> {
    try {
        if (!cameraIp || !ServerBase) return null

        const url = `${ServerBase}:${5000}/frame/${cameraIp}`

        const response = await axios.get(url, {
            responseType: "blob",
            headers: { Accept: "image/jpeg, image/png, image/gif" },
        })

        if (response.status === 200 && response.data instanceof Blob) {
            const blob = response.data
            const fileName = `camera_${cameraIp}_${Date.now()}.jpg`
            const file = new File([blob], fileName, {
                type: blob.type || "image/jpeg",
                lastModified: Date.now(),
            })
            return file
        }
        return null
    } catch (error) {
        return null
    }
}
