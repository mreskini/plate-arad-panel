export const formatTime = (date: Date) => {
    return date.toLocaleString("fa-IR", {
        timeStyle: "short",
    })
}
