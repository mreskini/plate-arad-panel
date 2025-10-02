import { Button, Text } from "@components/template"
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import { CloudPlus, Trash } from "iconsax-reactjs"
import type { ChangeEvent, DragEvent } from "react"
import { useState } from "react"

interface I_Props {
    file: File | null
    imageUrl?: string
    onDelete?: () => void
    setFile: (file: File | null) => void
}

export const UploadUserProfileImage = ({ file, setFile, imageUrl, onDelete }: I_Props) => {
    // States and Hooks
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<KeysWithoutReturnObjects["alerts"] | null>(null)

    // Methods
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]

        if (selectedFile) {
            const validTypes = ["image/png", "image/jpeg", "image/jpg"]
            if (!validTypes.includes(selectedFile.type)) {
                setError("invalid_image_file_type_error")
                return
            }

            if (selectedFile.size > 250 * 1024) {
                setError("invalid_image_file_size_error")
                return
            }

            setFile(selectedFile)
            setError(null)
        }
    }

    const handleDelete = () => {
        setFile(null)
        setError(null)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)

        const droppedFile = event.dataTransfer.files[0]
        if (droppedFile) {
            const syntheticEvent = {
                target: { files: [droppedFile] },
            } as unknown as ChangeEvent<HTMLInputElement>

            handleFileChange(syntheticEvent)
        }
    }

    // Render
    return (
        <label htmlFor="file-upload" className="cursor-pointer">
            <div
                className={clsx([
                    "flex flex-col items-center justify-center border rounded-2xl border-neutral-300 border-dashed p-4 mt-2",
                    isDragging && "bg-blue-100",
                ])}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {!file && imageUrl && (
                    <div className="relative mt-4">
                        <img src={imageUrl} alt="Current profile" className="h-30 w-auto object-cover rounded" />
                        <Button
                            variant="ghost"
                            onClick={onDelete}
                            className="absolute top-0 right-0 bg-white rounded-full p-1"
                            aria-label="Delete preview image"
                        >
                            <Trash size={16} className="text-red-500" />
                        </Button>
                    </div>
                )}
                {!file && !imageUrl && (
                    <>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />

                        <div className="flex justify-center items-center">
                            <CloudPlus size={48} className="text-blue-600" />
                        </div>

                        <Text
                            ns="input"
                            contentKey="drag_your_image_here"
                            className="text-neutral-700 my-2 block"
                            variant="title-2"
                            weight={500}
                        />

                        <Text
                            ns="input"
                            contentKey="image_valid_formats"
                            className="text-neutral-400 mb-2"
                            variant="meta-2"
                        />
                        <Text ns="input" contentKey="image_valid_size" className="text-neutral-400" variant="meta-2" />
                    </>
                )}

                {file && (
                    <div className="relative mt-4">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="h-30 w-auto object-cover rounded"
                        />

                        <Button
                            variant="ghost"
                            onClick={handleDelete}
                            className="absolute top-0 right-0 bg-white rounded-full p-1"
                            aria-label="Delete preview image"
                        >
                            <Trash size={16} className="text-red-500" />
                        </Button>
                    </div>
                )}

                {error && (
                    <Text
                        contentKey={error}
                        ns="alerts"
                        variant="meta-1"
                        className="bg-red-50 rounded-md px-4 py-2 text-red-500 mt-2"
                    />
                )}
            </div>
        </label>
    )
}
