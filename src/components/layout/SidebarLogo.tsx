import { useLayout } from "@core/stores"
import { AppRoutes, Images } from "@core/utilities"
import { Link } from "react-router-dom"

export const SidebarLogo = () => {
    // States and Hooks
    const { setCategory } = useLayout()

    // Methods
    const onLogoClick = () => setCategory("dashboard")

    // Render
    return (
        <div className="py-8 lg:py-6 border-b border-zinc-200">
            <div className="flex h-full items-center gap-2 px-4 lg:px-8">
                <Link to={AppRoutes.index} onClick={onLogoClick} className="w-full">
                    <img src={Images.OriginalLogo} alt="Logo" className="h-16 w-auto me-auto" />
                </Link>
            </div>
        </div>
    )
}
