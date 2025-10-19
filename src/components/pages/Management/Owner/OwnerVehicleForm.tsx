import { Button, Divider, Input, Spinner } from "@components/template"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { UploadOwnerVehicleImage } from "./UploadOwnerVehicleImage"

interface I_Props {
    onSubmit: (data: I_OwnerVehicleFormData) => Promise<void>
    onClose: Function
}

export interface I_OwnerVehicleFormData {
    plate: string
    model: string
    color: string
    year: string
    imageUrl?: string
    imageFile: File | null
}

export const OwnerVehicleForm: FC<I_Props> = ({ onSubmit, onClose }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_OwnerVehicleFormData>({
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
                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="plate_number" className="min-w-32" required />
                        <div className="flex items-center gap-2">
                            <Input.PlateNumber disabled={isFetching} clearable />
                        </div>
                    </div>

                    <Divider className="mb-4" />

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

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey="add"
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
