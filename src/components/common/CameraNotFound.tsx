import { Text } from "@components/template"

export const CameraNotFound = () => {
    // Render
    return (
        <div className="rounded-2xl w-full h-auto flex justify-center items-center aspect-video">
            <Text contentKey="camera_not_connected" weight={600} />
        </div>
    )
}
