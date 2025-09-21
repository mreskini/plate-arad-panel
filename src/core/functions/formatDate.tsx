export const formatDate = (date: Date) => {
    return date.toLocaleString("fa-IR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}
