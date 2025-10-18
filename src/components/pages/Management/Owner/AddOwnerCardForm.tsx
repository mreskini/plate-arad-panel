import { Button, Divider, Input, Spinner } from "@components/template"
import { E_OwnerCardType } from "@core/api/gql/types"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { UploadOwnerVehicleImage } from "./UploadOwnerVehicleImage"

interface I_Props {
    onSubmit: (data: I_AddOwnerCardFormData) => Promise<void>
    onClose: Function
}

export interface I_AddOwnerCardFormData {
    cardType: E_OwnerCardType
    cardToken: string
    plate: string
    model: string
    color: string
    year: string
    imageUrl?: string
    imageFile: File | null
}

export const AddOwnerCardForm: FC<I_Props> = ({ onSubmit, onClose }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        handleSubmit,
        setValue,
        getValues,
        watch,
        register,
        formState: { isSubmitting },
    } = useForm<I_AddOwnerCardFormData>({
        mode: "onChange",
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
                <div className="sm:min-w-lg flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}
            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-lg">
                    <div className="flex w-full items-center gap-4 mb-4">
                        <Input.Label labelKey="id_type" className="min-w-24" />
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
                                {
                                    value: E_OwnerCardType.Plate,
                                    labelKey: "plate",
                                },
                            ]}
                            value={getValues("cardType")}
                            setValue={(_: string) => setValue("cardType", _ as E_OwnerCardType)}
                            wrapperClassName="max-w-lg"
                        />
                    </div>

                    <Divider className="mb-4" />

                    {watch("cardType") === E_OwnerCardType.CSN && (
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="CSN" className="min-w-24" required />
                            <Input
                                placeholder="please_enter_id"
                                value={getValues("cardToken")}
                                onChange={e => setValue("cardToken", e.target.value)}
                                className="w-full"
                            />
                        </div>
                    )}

                    {watch("cardType") === E_OwnerCardType.UHF && (
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="UHF" className="min-w-24" required />
                            <Input
                                placeholder="please_enter_id"
                                value={getValues("cardToken")}
                                onChange={e => setValue("cardToken", e.target.value)}
                                className="w-full"
                            />
                        </div>
                    )}

                    {watch("cardType") === E_OwnerCardType.Plate && (
                        <>
                            <div className="flex w-full items-center gap-2 mb-4">
                                <Input.Label labelKey="plate_number" className="min-w-32" required />
                                <div className="flex items-center gap-2">
                                    <Input.PlateNumber disabled={isFetching} clearable />
                                </div>
                            </div>

                            <div className="flex w-full items-center gap-2 mb-4">
                                <Input.Label labelKey="model" className="min-w-32" />
                                <Input
                                    placeholder="vehicle_model_here"
                                    disabled={isSubmitting}
                                    className="w-full"
                                    {...register("model")}
                                />
                            </div>

                            <div className="flex w-full items-center gap-2 mb-4">
                                <Input.Label labelKey="color" className="min-w-32" />
                                <Input
                                    placeholder="vehicle_color_here"
                                    disabled={isSubmitting}
                                    className="w-full"
                                    {...register("color")}
                                />
                            </div>

                            <div className="flex w-full items-center gap-2 mb-4">
                                <Input.Label labelKey="production_year" className="min-w-32" />
                                <Input
                                    placeholder="vehicle_year_here"
                                    disabled={isSubmitting}
                                    className="w-full"
                                    {...register("year")}
                                />
                            </div>

                            <div className="flex w-full items-center gap-2 mb-4">
                                <Input.Label labelKey="image" className="min-w-32" />
                                <div className="w-full">
                                    <UploadOwnerVehicleImage
                                        file={watch("imageFile")}
                                        setFile={file => setValue("imageFile", file)}
                                        imageUrl={watch("imageUrl")}
                                        onDelete={() => setValue("imageUrl", "")}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey="assign"
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
