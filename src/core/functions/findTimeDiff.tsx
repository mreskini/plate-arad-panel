import moment from "moment"

export const findTimeDiff = (start: Date, end: Date): string => {
    const s = moment(start.toString())
    const e = moment(end.toString())
    const diffInMins = e.diff(s, "minutes")

    const hours = Math.floor(diffInMins / 60)
    const minutes = diffInMins % 60

    // Format the result in hh:mm
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}
