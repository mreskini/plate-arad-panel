import { Button, Text } from "@components/template"
import type { E_IdentifierType } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { DocumentDownload } from "iconsax-reactjs"
import type { FC } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { UploadExcel } from "./UploadExcel"

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Management.Identifier.Add

export type T_GroupIdentifierInput = {
    number: string
    serial: string
    type: E_IdentifierType
}

export const AddIdentifierGroupMethod: FC<I_Props> = ({ callback }) => {
    // States and Hooks
    const { closeModal } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [identifierInputs, setIdentifierInputs] = useState<T_GroupIdentifierInput[]>([])
    const isValid = identifierInputs.length > 0

    // Methods
    const onSubmit = async () => {
        setIsLoading(true)
        await callback()
        closeModal(CurrentModal)
        setIsLoading(false)
    }

    // Render
    return (
        <form className="sm:min-w-xl">
            <div className="bg-blue-50 p-2 flex items-center justify-between border border-blue-500 rounded-lg">
                <Text contentKey="please_download_excel_like_example" className="text-blue-600" />

                <Link to="/bulk-card-upload-template.xlsx" target="_blank">
                    <Button contentKey="download_example" icon={<DocumentDownload size={20} />} />
                </Link>
            </div>

            <div className="mt-4">
                <UploadExcel setIdentifierInputs={setIdentifierInputs} />
            </div>

            <div className="flex items-center gap-4 mt-8">
                <Button
                    contentKey="add"
                    type="submit"
                    className="w-40"
                    loading={isLoading}
                    disabled={!isValid || isLoading}
                    onClick={onSubmit}
                />

                <Button
                    contentKey="cancel"
                    variant="gray-outline"
                    onClick={() => closeModal(CurrentModal)}
                    className="w-40"
                    disabled={isLoading}
                />
            </div>
        </form>
    )
}
