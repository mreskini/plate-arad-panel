import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { AnimatePresence, motion } from "framer-motion"
import { Add } from "iconsax-reactjs"
import { type FC, type ReactNode } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router-dom"

interface I_Modal {
    name: string
    children: ReactNode
    title: ReactNode
    closeButton?: boolean
    closable?: boolean
}

const ModalVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
}

export const Modal: FC<I_Modal> = ({ name, children, title, closeButton = false, closable = true }) => {
    // States and hooks
    const { closeModal } = useModal()
    const navigate = useNavigate()

    const isCloseButtonAvailable = closeButton && closable

    // Methods
    const handleModalClose = () => {
        if (name === Modals.Logout) {
            navigate(-1)
            return
        }
        if (closable) closeModal(name)
    }

    useHotkeys("esc", handleModalClose)

    // Render
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 items-center justify-center flex">
                <button
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    type="button"
                    onClick={() => {
                        if (closable) handleModalClose()
                    }}
                >
                    <div className="hidden">close</div>
                </button>
                <motion.div
                    className="absolute mx-auto flex max-h-[90%] overflow-visible p-6 w-full flex-col items-center justify-center bg-white sm:block sm:size-auto sm:rounded-3xl"
                    initial="initial"
                    animate="animate"
                    variants={ModalVariants}
                    transition={{ duration: 0.2 }}
                >
                    <div className="mb-4 rounded-t-3xl flex items-center justify-between">
                        <div>{title}</div>

                        {isCloseButtonAvailable && (
                            <button
                                type="button"
                                className="flex cursor-pointer items-center justify-center"
                                onClick={() => handleModalClose()}
                            >
                                <Add className="text-zinc-600 rotate-45" />
                            </button>
                        )}
                    </div>

                    <div className="pt-4">{children}</div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
