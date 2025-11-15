/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Text } from "@components/template"
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import { CloudPlus, Trash } from "iconsax-reactjs"
import type { ChangeEvent, DragEvent, FC } from "react"
import { useState } from "react"
import * as XLSX from "xlsx"

import type { T_GroupIdentifierInput } from "./AddIdentifierGroupMethod"

interface I_Props {
    setIdentifierInputs: Function
}

export const UploadExcel: FC<I_Props> = ({ setIdentifierInputs }) => {
    // States and Hooks
    const [fileName, setFileName] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<KeysWithoutReturnObjects["alerts"] | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // Methods
    const parseExcelFile = async (file: File) => {
        setIsProcessing(true)
        try {
            const data = await file.arrayBuffer()
            const workbook = XLSX.read(data)
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            const jsonData: T_GroupIdentifierInput[] = XLSX.utils.sheet_to_json(worksheet)

            // Log all rows to console
            setIdentifierInputs(jsonData)

            return jsonData
        } catch (err) {
            setError("excel_parse_error")
            return null
        } finally {
            setIsProcessing(false)
        }
    }
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]

        if (selectedFile) {
            const validTypes = [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                "application/vnd.ms-excel", // .xls
            ]

            if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(xlsx|xls|csv)$/i)) {
                setError("invalid_excel_file_type_error")
                return
            }

            if (selectedFile.size > 5 * 1024 * 1024) {
                // 5MB limit
                setError("invalid_excel_file_size_error")
                return
            }

            await parseExcelFile(selectedFile)
            setFileName(selectedFile.name)
            setError(null)
        }
    }

    const handleDelete = () => {
        setFileName(null)
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
        <div>
            <label htmlFor="excel-upload" className="cursor-pointer">
                <div
                    className={clsx([
                        "flex flex-col items-center justify-center border-2 rounded-2xl border-blue-500 border-dashed p-4 mt-4",
                        isDragging && "bg-blue-100",
                    ])}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!fileName && (
                        <>
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                onChange={handleFileChange}
                                className="hidden"
                                id="excel-upload"
                            />

                            <div className="flex justify-center items-center">
                                <CloudPlus size={48} className="text-blue-600" />
                            </div>

                            <Text
                                ns="input"
                                contentKey="drag_your_excel_file_here"
                                className="text-neutral-700 my-2 block"
                                variant="title-2"
                                weight={500}
                            />

                            <Text
                                ns="input"
                                contentKey="excel_valid_formats"
                                className="text-neutral-400 mb-2"
                                variant="meta-2"
                            />
                            <Text
                                ns="input"
                                contentKey="excel_valid_size"
                                className="text-neutral-400"
                                variant="meta-2"
                            />
                        </>
                    )}

                    {fileName && (
                        <div className="relative w-full">
                            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                                <Text content={fileName} className="text-blue-700 truncate max-w-xs" />
                                <Button
                                    variant="ghost"
                                    onClick={handleDelete}
                                    className="p-1"
                                    aria-label="Remove file"
                                    loading={isProcessing}
                                >
                                    <Trash size={16} className="text-red-500" />
                                </Button>
                            </div>
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
        </div>
    )
}
