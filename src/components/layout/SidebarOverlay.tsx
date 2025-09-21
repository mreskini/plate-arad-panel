import { Button } from "@components/template"
import { useLayout } from "@core/stores"
import { Images } from "@core/utilities"
import { AnimatePresence, motion } from "framer-motion"
import { Add } from "iconsax-reactjs"
import { type FC } from "react"

interface I_Props {}

export const SidebarOverlay: FC<I_Props> = () => {
    // States and hooks
    // const navigate = useNavigate()
    const { setIsSidebarOverlayOpen } = useLayout()
    // const [currentPath, setCurrentPath] = useState("")

    const sidebarOverlayMenuVariants = {
        initial: { x: "-100%" },
        animate: { x: "0%" },
    }

    // Methods
    const handleSidebarOverlayClose = () => setIsSidebarOverlayOpen(false)

    // const handleSidebarOverlayItemSelect = (path: string) => {
    //     navigate(path)
    //     handleSidebarOverlayClose()
    // }

    // Use effects
    // useEffect(() => {
    //     setCurrentPath(window.location.pathname)
    // }, [])

    // TODO: Sidebar overlay is not working fine, we should update according to the new static items.
    // Render
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <button className="fixed inset-0 bg-black/30" type="button" onClick={handleSidebarOverlayClose}>
                    <div className="hidden">close</div>
                </button>

                <motion.div
                    className="absolute left-0 top-0 flex h-screen w-full flex-col bg-zinc-50 sm:w-72"
                    initial="initial"
                    animate="animate"
                    variants={sidebarOverlayMenuVariants}
                    transition={{ duration: 0.15 }}
                >
                    <div className="flex w-full items-center justify-between px-4 py-6">
                        <div className="flex h-full items-center gap-2">
                            <div className="flex items-center justify-center">
                                <img src={Images.Logo} alt="Logo" className="h-auto w-full" />
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={handleSidebarOverlayClose}
                            className="flex items-center justify-center"
                        >
                            <Add size={32} className="rotate-45" />
                        </Button>
                    </div>

                    <div className="h-px w-full bg-zinc-200" />

                    {/* <div className="flex grow flex-col gap-4 px-4 py-5">
                        {SidebarItems.map(_ => {
                            let isActive
                            if (_.link === AppRoutes.index) isActive = currentPath === _.link
                            if (_.link !== AppRoutes.index) isActive = currentPath.includes(_.link)

                            return (
                                <Button
                                    key={_.titleContentKey}
                                    variant="ghost"
                                    className={clsx([
                                        "flex items-center gap-2.5 rounded-xl p-2",
                                        isActive && "bg-amber-500/10",
                                        _.endItem && "mt-auto",
                                    ])}
                                    onClick={() => handleSidebarOverlayItemSelect(_.link)}
                                >
                                    <div className={clsx([isActive ? "text-amber-500" : "text-zinc-800"])}>
                                        {_.icon}
                                    </div>

                                    <Text
                                        ns="common"
                                        contentKey={_.titleContentKey}
                                        variant="body"
                                        className={clsx([isActive ? "text-amber-500" : "text-zinc-800"])}
                                    />
                                </Button>
                            )
                        })}
                    </div> */}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
