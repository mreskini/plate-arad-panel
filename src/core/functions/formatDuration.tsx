import { formatNumber } from "./formatNumber"

export const formatDuration = (ms: number) => {
    const totalMinutes = Math.floor(ms / 60000)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const formattedHours = formatNumber(hours).padStart(2, formatNumber(0))
    const formattedMinutes = formatNumber(minutes).padStart(2, formatNumber(0))

    return `${formattedHours}:${formattedMinutes}`
}
