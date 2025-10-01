import { Button, Input, Spinner } from "@components/template"
import type { T_Role, T_User } from "@core/api"
import { useCommon } from "@core/contexts"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_UserFormData) => Promise<void>
    onClose: Function
    user?: T_User
}

export interface I_UserFormData {
    username: string
    fullname: string
    password: string
    roleToken: string
    description: string
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

        setValue("fullname", user.fullname)
        setValue("username", user.username)
        setValue("roleToken", user.role.token)
        setValue("description", user.fullname)
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-4xl flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}
            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-4xl">
                    <div className="flex items-center gap-8">
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
                    </div>

                    <div className="flex items-center gap-8">
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
                    </div>

                    <div className="flex w-full items-center gap-2 mb-4">
                        <Input.Label labelKey="descriptions" className="min-w-32" />
                        <Input.Textarea
                            placeholder="enter_descriptions"
                            defaultValue={getValues("description")}
                            onChange={e => setValue("description", e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey={user ? "save" : "add"}
                            type="submit"
                            className="w-40"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        />

                        <Button
                            contentKey="cancel"
                            variant="gray-outline"
                            onClick={() => onClose()}
                            className="w-40"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            )}
        </>
    )
}
