import { Button, Text } from "@components/template"
import { useApp, useLayout } from "@core/stores"
import { AppRoutes, Icons, Images } from "@core/utilities"
import clsx from "clsx"
import { LogoutCurve } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Header = () => {
    // States and hooks
    const navigate = useNavigate()
    const { currentUser, parking } = useApp()
    const [parkingName, setParkingName] = useState(parking?.name ?? "")
    const { setIsSidebarOverlayOpen, isAuthenticating } = useLayout()
    const fullname = currentUser?.fullname ?? ""

    // Methods
    useEffect(() => {
        if (parking) setParkingName(parking.name)
    }, [parking])

    // Render
    return (
        <div className="relative z-50 flex items-center justify-end px-4 pt-6 lg:px-8 lg:py-[31px] border-b border-zinc-200 bg-zinc-50">
            {isAuthenticating && <div className="bg-zinc-200 w-48 h-[42px] rounded-xl animate-pulse" />}

            {!isAuthenticating && (
                <>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" onClick={() => setIsSidebarOverlayOpen(true)} className="lg:hidden">
                            <img src={Icons.HamburgerMenu} alt="Hamburger menu icon" className="size-8" />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="flex items-center gap-6"
                        onClick={() => navigate(AppRoutes.logout)}
                    >
                        <div className={clsx(["flex size-10 items-center justify-center rounded-full lg:me-2"])}>
                            <img src={Images.UserProfilePlaceholder} alt="User profile placeholder" />
                        </div>
                        <div>
                            <div className="me-3 hidden flex-col items-start lg:flex">
                                <Text
                                    content={fullname}
                                    variant="meta-1"
                                    className="block text-neutral-600"
                                    weight={600}
                                />
                            </div>
                            <div className="me-3 hidden flex-col items-start lg:flex">
                                <Text content={parkingName} variant="meta-2" className="block text-blue-500" />
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
