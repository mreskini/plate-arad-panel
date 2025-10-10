import { Button, Spinner, Text } from "@components/template"
import type { T_Owner } from "@core/api/gql/types"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_RemoveOwnerCardFormData) => Promise<void>
    onClose: Function
    owner: T_Owner
}

export interface I_RemoveOwnerCardFormData {
    cardToken: string
    ownerToken: string
}

export const RemoveOwnerCardForm: FC<I_Props> = ({ onSubmit, onClose, owner }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<I_RemoveOwnerCardFormData>({
        mode: "onChange",
        defaultValues: {
            ownerToken: owner.descriptions,
            cardToken: owner.card?.token,
        },
    })

    // Methods
    const init = async () => {
        setIsFetching(false)
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-sm flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}

            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-sm">
                    <div className="flex items-center gap-1">
                        <Text contentKey="are_you_sure_you_want_to_unassign_card_from_owner" />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey="unassign"
                            variant="red-outline"
                            type="submit"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        />

                        <Button
                            contentKey="cancel"
                            variant="gray-outline"
                            onClick={() => onClose()}
                            className="w-full"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            )}
        </>
    )
}
