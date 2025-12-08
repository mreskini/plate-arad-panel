import { CameraNotFound } from "@components/common"
import { HlsPlayer, Spinner } from "@components/template"
import type { T_Client } from "@core/api"
import { useStream } from "@core/hooks"
import type { FC } from "react"

interface I_Props {
    client: T_Client
}
export const CameraViewer: FC<I_Props> = ({ client }) => {
    // States and Hooks
    const { camera } = client

    const { isStarted, streamUrl, isLoading } = useStream({
        username: camera?.username ?? "",
        password: camera?.password ?? "",
        ip: camera?.ip ?? "",
        channel: 1,
        brand: camera?.brand_name ?? "",
    })

    return (
        <div className="rounded-xl aspect-video bg-neutral-100 relative">
            {client.camera && isLoading && (
                <div className="flex items-center justify-center h-full">
                    <Spinner className="size-16" />
                </div>
            )}
            {isStarted && streamUrl && <HlsPlayer id="plate-camera" url={streamUrl} />}
            {isStarted && !streamUrl && <CameraNotFound />}
        </div>
    )
}
