import { Button, Input, Modal, Text } from "@components/template"
import { E_OwnerCardType, type T_Card } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    callback: Function
    card: T_Card
}

interface I_FormData {
    cardNumber: string
    code: string
}

const currentModal = Modals.Management.Card.EditCard

export const EditCardModal: FC<I_Props> = ({ callback, card }) => {
    // States and hooks
    const { closeModal } = useModal()

    const {
        register,
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = useForm<I_FormData>({
        mode: "onChange",
        defaultValues: {
            cardNumber: card.card_number,
            code: card.serial,
        },
    })

    // Flags
    const isCSN = card.type === E_OwnerCardType.CSN

    // Methods
    const onSubmit = async () => {
        await callback()
        closeModal(currentModal)
    }
    // Render
    return (
        <Modal
            name={currentModal}
            title={<Text contentKey="edit_card" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-3xl">
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
                        value={card.type}
                        setValue={() => {}}
                        disabled
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
                        contentKey="save"
                        type="submit"
                        className="w-40"
                        loading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                    />

                    <Button
                        contentKey="cancel"
                        variant="gray-outline"
                        onClick={() => closeModal(currentModal)}
                        className="w-40"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </Modal>
    )
}
