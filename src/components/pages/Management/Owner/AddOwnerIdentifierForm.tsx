import type { T_InputDropdownOption } from "@components/template"
import { Button, Divider, Input, Spinner } from "@components/template"
import { E_IdentifierType } from "@core/api"
import { useCommon } from "@core/contexts"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { UploadOwnerVehicleImage } from "./UploadOwnerVehicleImage"

interface I_Props {
    onSubmit: (data: I_AddOwnerIdentifierFormData) => Promise<void>
    onClose: Function
}

export interface I_AddOwnerIdentifierFormData {
    identifierType: E_IdentifierType
    identifierToken: string
    plate: string
    model?: string
    color?: string
    year?: string
    imageUrl?: string
    imageFile: File | null
}

export const AddOwnerIdentifierForm: FC<I_Props> = ({ onSubmit, onClose }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)
    const { onCardIdentifierSearch, onTagIdentifierSearch } = useCommon()
    const [initialCardIdentifiers, setInitialCardIdentifiers] = useState<T_InputDropdownOption[]>([])
    const [initialTagIdentifiers, setInitialTagIdentifiers] = useState<T_InputDropdownOption[]>([])

    const {
        handleSubmit,
        setValue,
        getValues,
        watch,
        register,
        formState: { isSubmitting },
    } = useForm<I_AddOwnerIdentifierFormData>({
        mode: "onChange",
    })

    // Methods
    const init = async () => {
        setIsFetching(false)
    }

    useEffect(() => {
        init()
        onCardIdentifierSearch("", true).then(_ => setInitialCardIdentifiers(_))
        onTagIdentifierSearch("", true).then(_ => setInitialTagIdentifiers(_))
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
                                    value: E_IdentifierType.Card,
                                    labelKey: "card",
                                },
                                {
                                    value: E_IdentifierType.Tag,
                                    labelKey: "tag",
                                },
                                {
                                    value: E_IdentifierType.Vehicle,
                                    labelKey: "vehicle",
                                },
                            ]}
                            value={getValues("identifierType")}
                            setValue={(_: string) => setValue("identifierType", _ as E_IdentifierType)}
                            wrapperClassName="max-w-lg"
                        />
                    </div>

                    <Divider className="mb-4" />

                    {watch("identifierType") === E_IdentifierType.Card && (
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="card" className="min-w-24" required />
                            <Input.DropDown
                                options={initialCardIdentifiers}
                                value={watch("identifierToken")}
                                setValue={(_: string) => setValue("identifierToken", _)}
                                disabled={isFetching}
                                placeholder="please_search_identifier"
                                onSearch={onCardIdentifierSearch}
                            />
                        </div>
                    )}

                    {watch("identifierType") === E_IdentifierType.Tag && (
                        <div className="flex w-full items-center gap-4 mb-4">
                            <Input.Label labelKey="tag" className="min-w-24" required />
                            <Input.DropDown
                                options={initialTagIdentifiers}
                                value={watch("identifierToken")}
                                setValue={(_: string) => setValue("identifierToken", _)}
                                disabled={isFetching}
                                placeholder="please_search_identifier"
                                onSearch={onTagIdentifierSearch}
                            />
                        </div>
                    )}

                    {watch("identifierType") === E_IdentifierType.Vehicle && (
                        <>
                            <div className="flex w-full items-center gap-2 mb-4">
                                <Input.Label labelKey="plate_number" className="min-w-32" required />
                                <div className="flex items-center gap-2">
                                    <Input.PlateNumber
                                        disabled={isSubmitting}
                                        className="w-full"
                                        setValue={(_: string) => setValue("plate", _)}
                                    />
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
