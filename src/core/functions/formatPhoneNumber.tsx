export const formatPhoneNumber = (phoneNumber: string): string => {
    return `${new Intl.NumberFormat("fa-IR").format(Number(phoneNumber.slice(0, 4)))}-${new Intl.NumberFormat(
        "fa-IR"
    ).format(Number(phoneNumber.slice(4, 7)))}-${new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(
        Number(phoneNumber.slice(7, 11))
    )}`
}
