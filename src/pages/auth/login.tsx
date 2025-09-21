import { Layout } from "@components/layout"
import { Button, Input, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { useCommon } from "@core/contexts"
import { useAuth, useLayout } from "@core/stores"
import { AppRoutes } from "@core/utilities"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface I_LoginForm {
    username: string
    password: string
}

export const Login = () => {
    // States and hooks
    const navigate = useNavigate()
    const { setCategory } = useLayout()
    const { fetchCurrentUser } = useCommon()
    const { setAccessToken } = useAuth()
    const { notify } = useNotify()

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = useForm<I_LoginForm>({
        mode: "onChange",
    })

    // Methods
    const onSubmit = async ({ username, password }: I_LoginForm) => {
        const { data, error } = await API.User.UserLogin({
            body: { username: username.trim(), password: password.trim() },
        })

        if (data) {
            setAccessToken(data.userLogin)
            await fetchCurrentUser()
            setCategory("dashboard")
            notify("successful_login", "success")
            navigate(AppRoutes.index)
            return
        }
        if (error) toast.error(error)
    }

    // Render
    return (
        <Layout.Auth>
            <form className="flex flex-col items-center md:items-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-2">
                    <Text
                        ns="auth"
                        contentKey="login_title"
                        variant="heading-4"
                        weight={600}
                        className="mb-4 text-center text-zinc-800 md:text-start"
                    />

                    <Text
                        content="👋"
                        variant="heading-4"
                        weight={600}
                        className="mb-4 text-center text-zinc-800 md:text-start"
                    />
                </div>

                <div className="mb-6 flex w-full flex-col gap-1.5">
                    <Text ns="input" contentKey="username" variant="body" className="text-zinc-800" />
                    <Input
                        placeholder="your_username_here"
                        {...register("username", { required: true, minLength: 3 })}
                    />
                </div>
                <div className="mb-6 flex w-full flex-col gap-1.5">
                    <Text ns="input" contentKey="password" variant="body" className="text-zinc-800" />
                    <Input.Password
                        placeholder="your_password_here"
                        {...register("password", { required: true, minLength: 3 })}
                    />
                </div>

                <div className="flex w-full flex-col gap-8">
                    <Button
                        contentKey="continue"
                        loading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                        type="submit"
                    />
                </div>
            </form>
        </Layout.Auth>
    )
}
