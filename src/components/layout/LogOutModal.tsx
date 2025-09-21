import { Button, Modal, Text } from "@components/template"
import { useApp, useAuth } from "@core/stores"
import { AppRoutes, Modals } from "@core/utilities"
import { LogoutCurve } from "iconsax-reactjs"
import { useNavigate } from "react-router-dom"

export const LogOutModal = () => {
    // States and hooks
    const navigate = useNavigate()
    const { setCurrentUser } = useApp()
    const { setAccessToken } = useAuth()

    // Methods
    const closeModal = () => navigate(-1)
    const onLogoutButtonClick = () => {
        setAccessToken("")
        setCurrentUser(null)
        navigate(AppRoutes.auth.login, { replace: true })
    }

    // Render
    return (
        <Modal
            name={Modals.Logout}
            title={
                <div className="flex items-center gap-2">
                    <Text contentKey="logout" variant="heading-6" className="text-zinc-900" weight={500} />
                </div>
            }
            closeButton
        >
            <div className="w-md">
                <div className="bg-red-50 size-[76px] rounded-full mx-auto mb-6 flex items-center justify-center">
                    <LogoutCurve size={40} className="text-red-500" />
                </div>
                <div className="text-center">
                    <Text contentKey="logout_alert" variant="body" weight={600} />
                </div>

                <div className="mt-8 flex w-full flex-col items-center gap-2 text-center sm:w-auto sm:flex-row">
                    <div className="w-full">
                        <Button onClick={onLogoutButtonClick} variant="red" contentKey="logout" className="w-full" />
                    </div>
                    <div className="w-full">
                        <Button onClick={closeModal} variant="gray-outline" contentKey="cancel" className="w-full" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
