import { Loading } from "@components/common"
import { useCommon } from "@core/contexts"
import { fetchErrorsFromApi } from "@core/functions"
import { useError, useLayout } from "@core/stores"
import { Images } from "@core/utilities"
import clsx from "clsx"
import { type FC, type ReactNode, useEffect } from "react"

import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { SidebarOverlay } from "./SidebarOverlay"

interface I_Wrapper {
    children: ReactNode
}

interface I_Dashboard {
    children: ReactNode
    className?: string
}

interface I_Auth {
    children: ReactNode
}

const Wrapper: FC<I_Wrapper> = ({ children }) => {
    // States and Hooks
    const { setErrors } = useError()

    // Methods
    const init = async () => {
        const errors = await fetchErrorsFromApi()
        if (errors) setErrors(errors)
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <div>
            <div className="relative mx-auto flex h-screen w-full overflow-hidden bg-white">
                <div className="w-full">{children}</div>
            </div>
        </div>
    )
}

const Dashboard: FC<I_Dashboard> = ({ children, className = "" }) => {
    // States and hooks
    const { isSidebarOverlayOpen, isAuthenticating, setIsAuthenticating } = useLayout()
    const { fetchCurrentUser } = useCommon()

    // Methods
    const initialization = async () => {
        await fetchCurrentUser()
        setIsAuthenticating(false)
    }

    // UseEffects
    useEffect(() => {
        if (isAuthenticating) initialization()
    }, [])

    // Render
    return (
        <Wrapper>
            <div className="relative flex size-full">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>

                {isSidebarOverlayOpen && (
                    <div className="absolute left-0 top-0 bg-red-200 lg:hidden">
                        <SidebarOverlay />
                    </div>
                )}

                <div className="z-10 flex size-full overflow-auto flex-col">
                    <Header />

                    <div className={clsx(["relative h-full grow overflow-auto px-4 lg:px-8 pt-8", className])}>
                        {isAuthenticating && <Loading.Screen />}
                        {!isAuthenticating && children}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Auth: FC<I_Auth> = ({ children }) => {
    // Render
    return (
        <div className="flex h-screen items-center p-4 md:gap-10 md:p-10">
            <div className="flex size-full flex-col items-center">
                <div className="flex w-full grow items-center justify-center">
                    <div className="w-full lg:w-3/4 xl:w-[420px]">{children}</div>
                </div>
            </div>
            <div className="hidden size-full items-center justify-center rounded-3xl bg-blue-50 md:flex">
                <img src={Images.OriginalLogo} alt="Auth thumbnail" className="h-auto w-sm" />
            </div>
        </div>
    )
}

const Layout = () => {
    return null
}

Layout.Wrapper = Wrapper
Layout.Dashboard = Dashboard
Layout.Auth = Auth

export { Layout }
