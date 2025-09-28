import { Modal, Text } from "@components/template"
import { Modals } from "@core/utilities"
import { DocumentDownload } from "iconsax-reactjs"

export const ExportProgressModal = () => {
    // States and hooks
    const currentModal = Modals.ExportFile

    // Render
    return (
        <Modal
            name={currentModal}
            title={<Text contentKey="creating_file" variant="title-1" className="text-neutral-700" weight={600} />}
            closable={false}
        >
            <div className="flex flex-col items-center gap-2 min-w-96">
                <div className="bg-blue-50 p-5 rounded-full flex items-center justify-center animate-pulse">
                    <DocumentDownload size={32} className="text-blue-600 animate-pulse" />
                </div>

                <div className="mb-8">
                    <Text contentKey="please_wait" variant="meta-1" weight={500} className="text-neutral-800" />
                </div>
            </div>
        </Modal>
    )
}
