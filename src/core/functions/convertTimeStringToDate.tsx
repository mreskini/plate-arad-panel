export const convertTimeStringToDate = (timeString: string): Date | null => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, seconds, 0)
    return date
}
