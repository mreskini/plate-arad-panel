import { Status } from "@components/common"
import { Button, Text } from "@components/template"
import { useCommon } from "@core/contexts"
import { useApp, useLayout } from "@core/stores"
import { AppRoutes, Icons, Images } from "@core/utilities"
import clsx from "clsx"
import { LogoutCurve } from "iconsax-reactjs"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Header = () => {
    // States and hooks
    const navigate = useNavigate()
    const { currentUser } = useApp()
    const { isLicenseAvailable, fetchParkingInfo } = useCommon()
    const { setIsSidebarOverlayOpen, isAuthenticating } = useLayout()
    const fullname = currentUser?.fullname ?? ""
    const role = currentUser?.role.name ?? ""

    // Use effects
    useEffect(() => {
        fetchParkingInfo()
    }, [])

    // Render
    return (
        <div className="relative z-50 flex items-center justify-end px-4 pt-6 lg:px-8 lg:py-[34px] border-b border-zinc-200 bg-zinc-50">
            {isAuthenticating && <div className="bg-zinc-200 w-48 h-[44px] rounded-xl animate-pulse" />}

            {!isAuthenticating && (
                <>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" onClick={() => setIsSidebarOverlayOpen(true)} className="lg:hidden">
                            <img src={Icons.HamburgerMenu} alt="Hamburger menu icon" className="size-8" />
                        </Button>
                    </div>

                    {!isLicenseAvailable && !isAuthenticating && (
                        <Status
                            contentKey="license_not_available"
                            variant="error"
                            wrapperClassName="animate-pulse me-6"
                        />
                    )}

                    <Button
                        variant="ghost"
                        className="flex items-center gap-6"
                        onClick={() => navigate(AppRoutes.logout)}
                    >
                        <div className={clsx(["flex size-10 items-center justify-center rounded-full lg:me-2"])}>
                            <img src={Images.UserProfilePlaceholder} alt="User profile placeholder" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="me-3 hidden flex-col items-start lg:flex">
                                <Text
                                    content={fullname}
                                    variant="meta-1"
                                    className="block text-neutral-600"
                                    weight={600}
                                />
                            </div>
                            <div className="me-3 hidden flex-col items-start lg:flex">
                                <Text content={role} variant="meta-2" className="block text-blue-500" />
                            </div>
                        </div>
                        <Link to={AppRoutes.logout} className="flex items-center justify-center">
                            <LogoutCurve className="text-neutral-600" />
                        </Link>
                    </Button>
                </>
            )}
        </div>
    )
}
