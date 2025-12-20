// @core/hooks/useExport.ts
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { useState } from "react"
import { toast } from "react-toastify"

export const useReportExport = (filename: string) => {
    const { openModal, closeModal } = useModal()
    const [isExporting, setIsExporting] = useState(false)

    const handleExport = async (exportPromise: Promise<any>) => {
        setIsExporting(true)
        openModal(Modals.ExportFile)
        try {
            const { data, error } = await exportPromise

            if (error) {
                throw new Error(error)
            }

            if (!data) {
                throw new Error("No data received from export")
            }

            // Find the export data in the response
            const exportData = Object.values(data).find(
                (item: any) => item && typeof item === "object" && "format" in item && "data" in item
            ) as { format: string; data: string } | undefined

            if (!exportData) {
                throw new Error("Could not find export data in response")
            }

            // Create download link
            const link = document.createElement("a")
            link.href = exportData.data
            link.download = `${filename}.${exportData.format.toLowerCase()}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Export failed"
            toast.error(errorMessage)
        } finally {
            setIsExporting(false)
            closeModal(Modals.ExportFile)
        }
    }

    return {
        handleExport,
        isExporting,
    }
}
