import { Button, Modal, Text } from "@components/template"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

const CurrentModal = Modals.Image

interface I_Props {
    image: string
}

export const ImageModal: FC<I_Props> = ({ image }) => {
    // States and Hooks
    const { closeModal } = useModal()

    // Methods
    const onCloseClick = () => {
        closeModal(CurrentModal)
    }

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text content="" variant="title-1" className="text-neutral-700" weight={600} />}
        >
            <div className="w-2xl">
                <div className="w-full h-auto">
                    <img src={image} alt="Traffic" className="w-full h-auto" />
                </div>
                <div className="mt-10">
                    <Button contentKey="close" onClick={onCloseClick} variant="gray-outline" className="w-full" />
                </div>
            </div>
        </Modal>
    )
}
