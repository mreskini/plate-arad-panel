export const formatNumber = (num: number, lang?: string, useGrouping: boolean = true): string => {
    if (lang) return new Intl.NumberFormat(lang, { useGrouping }).format(num)
    return new Intl.NumberFormat("fa-IR", { useGrouping }).format(num)
}
