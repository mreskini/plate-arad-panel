import { Button, Divider, Input, Spinner } from "@components/template"
import type { T_Customer } from "@core/api"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { UploadOwnerProfileImage } from "./UploadOwnerProfileImage"

interface I_Props {
    onSubmit: (data: I_OwnerFormData) => Promise<void>
    onClose: Function
    owner?: T_Customer
}

export interface I_OwnerFormData {
    firstname: string
    lastname: string
    nationalCode: string
    phoneNumber: string
    descriptions?: string
    profileImageUrl?: string
    profileImageFile: File | null
}

export const OwnerForm: FC<I_Props> = ({ onSubmit, onClose, owner }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_OwnerFormData>({
        mode: "onChange",
    })

    // Methods
    const init = async () => {
        formDataBinding()
        setIsFetching(false)
    }
    const formDataBinding = () => {
        if (!owner) return

        setValue("firstname", owner.first_name)
        setValue("lastname", owner.last_name)
        setValue("nationalCode", owner.national_code)
        setValue("phoneNumber", owner.mobile)
        setValue("descriptions", owner.description ?? "")
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-3xl flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}

            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-3xl grid grid-cols-2 gap-4">
                    <div className="flex w-full items-center gap-2 mb-4 col-span-1">
                        <Input.Label labelKey="firstname" className="min-w-24" required />
                        <Input
                            placeholder="owner_firstname_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("firstname", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4 col-span-1">
                        <Input.Label labelKey="lastname" className="min-w-24" required />
                        <Input
                            placeholder="owner_lastname_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("lastname", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="national_code" className="min-w-24" required />
                        <Input
                            placeholder="owner_national_code_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("nationalCode", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="phone_number" className="min-w-24" required />
                        <Input
                            placeholder="owner_phone_number_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("phoneNumber", { required: true })}
                        />
                    </div>

                    <Divider className="mb-4 col-span-2" />

                    <div className="col-span-2 flex items-center gap-4">
                        <div className="flex w-full items-center gap-2 mb-4">
                            <Input.Label labelKey="descriptions" className="min-w-24" />
                            <Input.Textarea
                                placeholder="enter_descriptions"
                                defaultValue={getValues("descriptions")}
                                onChange={e => setValue("descriptions", e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="flex w-full items-center gap-2 col-span-2">
                        <Input.Label labelKey="image" className="min-w-24" />
                        <div className="w-full">
                            <UploadOwnerProfileImage
                                file={watch("profileImageFile")}
                                setFile={file => setValue("profileImageFile", file)}
                                imageUrl={watch("profileImageUrl")}
                                onDelete={() => setValue("profileImageUrl", "")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey={owner ? "save" : "add"}
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
