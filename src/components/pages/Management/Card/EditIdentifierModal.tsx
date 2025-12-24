import { Button, Input, Modal, Text, useNotify } from "@components/template"
import type { T_Identifier } from "@core/api"
import { API, E_IdentifierType } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface I_Props {
    callback: Function
    identifier: T_Identifier
}

interface I_FormData {
    number: string
    serial: string
}

const CurrentModal = Modals.Management.Identifier.Edit

export const EditIdentifierModal: FC<I_Props> = ({ callback, identifier }) => {
    // States and hooks
    const { closeModal } = useModal()
    const { notify } = useNotify()
    const { token, number, serial, type } = identifier

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isValid, isSubmitting },
    } = useForm<I_FormData>({
        mode: "onChange",
        defaultValues: { number, serial },
    })

    // Flags
    const isCard = identifier.type === E_IdentifierType.Card

    // Methods
    const onSubmit = async (formValues: I_FormData) => {
        const { data, error } = await API.Identifier.EditIdentifier({
            body: {
                token,
                number: formValues.number,
                serial: formValues.serial,
            },
        })

        if (data && data.editIdentifier) {
            await callback()
            notify("identifier_edited_successfully", "success")
            closeModal(CurrentModal)
        }

        if (error) toast.error(error)
    }

    useEffect(() => {
        if (!isCard) {
            const num = watch("number")
            if (num.length > 0) setValue("serial", num.padStart(6, "0"))
            else setValue("serial", "")
        }
    }, [watch("number")])

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="edit_identifier" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-md">
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
                        value={type}
                        setValue={() => {}}
                        disabled
                    />
                </div>

                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="number" className="min-w-24" required />
                    <Input
                        placeholder="enter_identifier_number"
                        disabled={isSubmitting}
                        className="w-full"
                        {...register("number", { required: true, minLength: 1, ...(!isCard && { maxLength: 6 }) })}
                    />
                </div>

                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="serial" className="min-w-24" required />
                    <Input
                        placeholder={isCard ? "CSN_example" : "UHF_example"}
                        disabled={isSubmitting}
                        className="w-full"
                        {...register("serial", {
                            required: true,
                            minLength: 1,
                            ...(!isCard && { minLength: 6, maxLength: 6 }),
                        })}
                    />
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <Button
                        contentKey="save"
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
        </Modal>
    )
}
