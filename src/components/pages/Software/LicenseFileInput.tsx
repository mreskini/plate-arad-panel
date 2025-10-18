import { Text } from "@components/template"
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import { Key } from "iconsax-reactjs"
import type { ChangeEvent, DragEvent } from "react"
import { useState } from "react"

interface I_Props {
    file: File | null
    setFile: (file: File | null) => void
}

export const LicenseFileInput = ({ file, setFile }: I_Props) => {
    // States and Hooks
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<KeysWithoutReturnObjects["alerts"] | null>(null)

    // Methods
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]

        if (selectedFile) {
            const validTypes = ["application/json"]

            if (!validTypes.includes(selectedFile.type)) {
                setError("invalid_license_file_type_error")
                return
            }

            if (selectedFile.size > 10 * 1024) {
                setError("invalid_license_file_size_error")
                return
            }

            setFile(selectedFile)
            setError(null)
        }
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
                {!file && (
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />

                        <div className="flex justify-center items-center">
                            <Key />
                        </div>

                        <Text
                            ns="input"
                            contentKey="drag_license_file_here"
                            className="text-neutral-700 my-2 block"
                            variant="meta-1"
                        />
                    </div>
                )}

                {file && (
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />

                        <div className="flex justify-center items-center">
                            <Key size={24} className="text-emerald-600" />
                        </div>

                        <Text ns="input" content={file.name} className="text-neutral-700 my-2 block" variant="meta-1" />
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
