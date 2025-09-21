import { type T_SidebarItem } from "@components/layout"

export const filterSidebarItemsByPermissions = (items: T_SidebarItem[], permissions: string[]): T_SidebarItem[] => {
    return items
        .map(item => {
            // Filter subItems first
            const filteredSubItems = item.subItems?.filter(
                subItem => permissions.includes(subItem.link) && !subItem.hidden
            )

            // Create filtered item copy
            const filteredItem: T_SidebarItem = {
                ...item,
                subItems: filteredSubItems?.length ? filteredSubItems : undefined,
            }

            // Determine if item should be kept
            const shouldKeepItem =
                (item.link && permissions.includes(item.link)) || (filteredSubItems && filteredSubItems.length > 0)

            return shouldKeepItem ? filteredItem : null
        })
        .filter(Boolean) as T_SidebarItem[]
}
