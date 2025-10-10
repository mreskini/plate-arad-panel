import { Button, Divider, Input, Spinner } from "@components/template"
import { E_CardType } from "@core/api/gql/types"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_AddOwnerCardFormData) => Promise<void>
    onClose: Function
}

export interface I_AddOwnerCardFormData {
    cardType: E_CardType
    cardToken: string
}

export const AddOwnerCardForm: FC<I_Props> = ({ onSubmit, onClose }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { isSubmitting },
    } = useForm<I_AddOwnerCardFormData>({
        mode: "onChange",
    })

    // Flags
    const isValid = watch("cardToken") && watch("cardType")

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
                <div className="sm:min-w-lg flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}
            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-lg">
                    <div className="flex w-full items-center gap-4 mb-4">
                        <Input.Label labelKey="card_type" className="min-w-24" />
                        <Input.DropDown
                            options={[
                                {
                                    value: E_CardType.CSN,
                                    labelKey: "CSN",
                                },
                                {
                                    value: E_CardType.RFID,
                                    labelKey: "RFID",
                                },
                            ]}
                            value={getValues("cardType")}
                            setValue={(_: string) => setValue("cardType", _ as E_CardType)}
                            wrapperClassName="max-w-lg"
                        />
                    </div>

                    <Divider className="mb-4" />

                    {watch("cardType") === E_CardType.CSN && (
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="card_number" className="min-w-24" />
                            <Input.DropDown
                                placeholder="please_search_card_number"
                                options={[{ value: "1234567890", label: "Card-32456" }]}
                                value={getValues("cardToken")}
                                setValue={(_: string) => setValue("cardToken", _)}
                                wrapperClassName="max-w-lg"
                                onSearch={() => {}}
                            />
                        </div>
                    )}

                    {watch("cardType") === E_CardType.RFID && (
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="card_number" className="min-w-24" />
                            <Input.DropDown
                                placeholder="please_search_card_number"
                                options={[{ value: "1234567890", label: "Card-32456" }]}
                                value={getValues("cardToken")}
                                setValue={(_: string) => setValue("cardToken", _)}
                                wrapperClassName="max-w-lg"
                                onSearch={() => {}}
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey="assign"
                            type="submit"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
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
