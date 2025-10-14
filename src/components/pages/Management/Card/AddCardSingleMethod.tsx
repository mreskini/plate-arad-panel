import { Button, Input } from "@components/template"
import { E_OwnerCardType } from "@core/api/gql/types"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC, useState } from "react"
import { useForm } from "react-hook-form"

interface I_FormData {
    type: E_OwnerCardType
    cardNumber: string
    code: string
}

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Management.Card.AddCard

export const AddCardSingleMethod: FC<I_Props> = ({ callback }) => {
    // States and Hooks
    const { closeModal } = useModal()
    const [cardType, setCardType] = useState<E_OwnerCardType>(E_OwnerCardType.CSN)

    const {
        register,
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = useForm<I_FormData>({
        mode: "onChange",
    })

    // Flags
    const isCSN = cardType === E_OwnerCardType.CSN

    // Methods
    const onSubmitSingle = async () => {
        await callback()
        closeModal(CurrentModal)
    }

    // Render
    return (
        <form onSubmit={handleSubmit(onSubmitSingle)} className="sm:min-w-3xl">
            <div className="flex w-full items-center gap-4 mb-4">
                <Input.Label labelKey="card_type" className="grow" required />
                <Input.DropDown
                    options={[
                        {
                            value: E_OwnerCardType.CSN,
                            labelKey: "CSN",
                        },
                        {
                            value: E_OwnerCardType.UHF,
                            labelKey: "UHF",
                        },
                    ]}
                    value={cardType}
                    setValue={(_: string) => setCardType(_ as E_OwnerCardType)}
                    wrapperClassName="max-w-lg"
                />
            </div>

            <div className="flex w-full items-center gap-4 mb-4">
                <Input.Label labelKey="card_number" className="grow" required />
                <Input
                    placeholder="enter_card_number"
                    disabled={isSubmitting}
                    className="w-full max-w-lg"
                    {...register("cardNumber", {
                        required: true,
                        minLength: 1,
                    })}
                />
            </div>

            {isCSN && (
                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="CSN" className="grow" required />
                    <Input
                        placeholder="CSN_example"
                        disabled={isSubmitting}
                        className="w-full max-w-lg"
                        {...register("code", {
                            required: true,
                            minLength: 1,
                        })}
                    />
                </div>
            )}

            {!isCSN && (
                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="UHF" className="grow" required />
                    <Input
                        placeholder="UHF_example"
                        disabled={isSubmitting}
                        className="w-full max-w-lg"
                        {...register("code", {
                            required: true,
                            minLength: 1,
                        })}
                    />
                </div>
            )}

            <div className="flex items-center gap-4 mt-4">
                <Button
                    contentKey="add"
                    type="submit"
                    className="w-40"
                    loading={isSubmitting}
                    disabled={!isValid || isSubmitting}
                />

                <Button
                    contentKey="cancel"
                    variant="gray-outline"
                    onClick={() => closeModal(CurrentModal)}
                    className="w-40"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    )
}
