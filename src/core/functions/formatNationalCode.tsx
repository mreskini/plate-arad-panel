export const formatNationalCode = (nationalCode: string): string => {
    return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(Number(nationalCode))
}
