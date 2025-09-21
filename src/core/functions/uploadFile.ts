export type T_FileResponse = {
    url: string
}

export const uploadFile = async (uploadUrl: string, file: File) => {
    try {
        const formData = new FormData()
        formData.append("image", file)
        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        })
        if (response.ok) {
            const data = await (response.json() as Promise<T_FileResponse>)
            return data
        }
        throw new Error(`File upload failed with status: ${response.status}`)
    } catch (err) {
        throw new Error("Error occurred while uploading file")
    }
}
