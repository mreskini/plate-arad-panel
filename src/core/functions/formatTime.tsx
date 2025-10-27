export const formatTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, seconds || 0)

    return date.toLocaleString("fa-IR", { timeStyle: "short" })
}
