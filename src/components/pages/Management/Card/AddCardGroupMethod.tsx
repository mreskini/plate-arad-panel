import { Button, Text } from "@components/template"
import type { E_CardType } from "@core/api/gql/types"
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

const CurrentModal = Modals.Management.Card.AddCard

export type T_GroupCardInput = {
    serial: string
    card_number: string
    type: E_CardType
}

export const AddCardGroupMethod: FC<I_Props> = ({ callback }) => {
    // States and Hooks
    const { closeModal } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [cardInputs, setCardInputs] = useState<T_GroupCardInput[]>([])
    const isValid = cardInputs.length > 0

    // Methods
    const onSubmit = async () => {
        setIsLoading(true)
        await callback()
        closeModal(CurrentModal)
        setIsLoading(false)
    }

    // Render
    return (
        <form className="sm:min-w-3xl">
            <div className="bg-blue-50 p-2 flex items-center justify-between border border-blue-500 rounded-lg">
                <Text contentKey="please_download_excel_like_example" className="text-blue-600" />

                <Link to="/bulk-card-upload-template.xlsx" target="_blank">
                    <Button contentKey="download_example" icon={<DocumentDownload size={20} />} />
                </Link>
            </div>

            <div className="mt-4">
                <UploadExcel setCardInputs={setCardInputs} />
            </div>

            <div className="flex items-center gap-4 mt-4">
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
