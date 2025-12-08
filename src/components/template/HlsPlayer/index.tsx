/* eslint-disable consistent-return */
import Hls from "hls.js"
import type { FC } from "react"
import { useEffect, useRef } from "react"

interface I_Props {
    url: string
    id: string
}
export const HlsPlayer: FC<I_Props> = ({ url, id }) => {
    // States and Hooks
    const videoRef = useRef<HTMLVideoElement | null>(null)

    // Use effects
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        let hls: Hls | null = null
        if (Hls.isSupported()) {
            hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play()
            })
        }

        return () => {
            if (hls) hls.destroy()
        }
    }, [url])

    // Render
    return <video id={id} ref={videoRef} className="rounded-2xl w-full h-auto" />
}
