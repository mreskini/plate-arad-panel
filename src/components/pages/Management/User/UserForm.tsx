import { Button, Divider, Input, Spinner } from "@components/template"
import type { T_Role, T_User } from "@core/api"
import { useCommon } from "@core/contexts"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { UploadUserProfileImage } from "./UploadUserProfileImage"

interface I_Props {
    onSubmit: (data: I_UserFormData) => Promise<void>
    onClose: Function
    user?: T_User
}

export interface I_UserFormData {
    username: string
    password: string
    fullname: string
    roleToken: string
    expirationDate: Date
    profileImageUrl?: string
    profileImageFile: File | null
}

export const UserForm: FC<I_Props> = ({ onSubmit, onClose, user }) => {
    // States and hooks
    const { fetchRoles } = useCommon()
    const [isFetching, setIsFetching] = useState(true)
    const [roles, setRoles] = useState<T_Role[]>([])

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_UserFormData>({
        mode: "onChange",
    })

    // Methods
    const init = async () => {
        const data = await fetchRoles()
        setRoles(data)
        formDataBinding()
        setIsFetching(false)
    }
    const formDataBinding = () => {
        if (!user) return

        setValue("username", user.username)
        setValue("fullname", user.fullname)
        setValue("roleToken", user.role.token)
        setValue("expirationDate", new Date(user.expiration_date))
        setValue("profileImageUrl", user.profile_image ?? "")
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
                        <Input.Label labelKey="username" className="min-w-32" required />
                        <Input
                            placeholder="your_username_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("username", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="password" className="min-w-32" required={!user} />
                        <div className="w-full">
                            <Input.Password
                                placeholder="your_password_here"
                                disabled={isSubmitting}
                                {...register("password", { required: !user })}
                            />
                        </div>
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="fullname" className="min-w-32" required />
                        <Input
                            placeholder="fullname_here"
                            disabled={isSubmitting}
                            className="w-full"
                            {...register("fullname", { required: true })}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="user_role" className="min-w-32" required />
                        <Input.DropDown
                            options={roles.map(_ => ({ value: _.token, label: _.name }))}
                            value={getValues("roleToken")}
                            setValue={(value: string) => setValue("roleToken", value)}
                            loading={isFetching}
                            disabled={isSubmitting || isFetching}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="expiration_date" className="min-w-32" required />
                        <Input.DatePicker
                            disabled={isSubmitting}
                            className="w-full"
                            value={getValues("expirationDate")}
                            onChange={(e: Date) => setValue("expirationDate", e)}
                        />
                    </div>

                    <Divider className="mb-4" />

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="upload_image" className="min-w-32" />
                        <div className="w-full">
                            <UploadUserProfileImage
                                file={watch("profileImageFile")}
                                setFile={file => setValue("profileImageFile", file)}
                                imageUrl={watch("profileImageUrl")}
                                onDelete={() => setValue("profileImageUrl", "")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey={user ? "save" : "add"}
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
