import { Button, Input, useNotify } from "@components/template"
import { API, E_IdentifierType } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface I_FormData {
    type: E_IdentifierType
    number: string
    serial: string
}

interface I_Props {
    callback: Function
}

const CurrentModal = Modals.Management.Identifier.Add

export const AddIdentifierSingleMethod: FC<I_Props> = ({ callback }) => {
    // States and Hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isValid, isSubmitting },
    } = useForm<I_FormData>({ mode: "onChange", defaultValues: { type: E_IdentifierType.Card } })

    // Flags
    const isCard = watch("type") === E_IdentifierType.Card

    // Methods
    const onSubmit = async (formValues: I_FormData) => {
        const { data, error } = await API.Identifier.CreateIdentifier({
            body: {
                type: formValues.type,
                number: formValues.number,
                serial: formValues.serial,
            },
        })

        if (data && data.createIdentifier) {
            await callback()
            notify("identifier_added_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    // Render
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-xl">
            <div className="flex w-full items-center gap-4 mb-4">
                <Input.Label labelKey="type" className="min-w-24" required />
                <Input.DropDown
                    options={[
                        {
                            value: E_IdentifierType.Card,
                            labelKey: "card",
                        },
                        {
                            value: E_IdentifierType.Tag,
                            labelKey: "tag",
                        },
                    ]}
                    value={getValues("type")}
                    setValue={(value: string) => setValue("type", value as E_IdentifierType)}
                />
            </div>

            <div className="flex w-full items-center gap-4 mb-4">
                <Input.Label labelKey="number" className="min-w-24" required />
                <Input
                    placeholder="enter_identifier_number"
                    disabled={isSubmitting}
                    className="w-full"
                    {...register("number", { required: true, minLength: 1 })}
                />
            </div>

            <div className="flex w-full items-center gap-4 mb-4">
                <Input.Label labelKey="serial" className="min-w-24" required />
                <Input
                    placeholder={isCard ? "CSN_example" : "UHF_example"}
                    disabled={isSubmitting}
                    className="w-full"
                    {...register("serial", { required: true, minLength: 1 })}
                />
            </div>

            <div className="flex items-center gap-4 mt-8">
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
