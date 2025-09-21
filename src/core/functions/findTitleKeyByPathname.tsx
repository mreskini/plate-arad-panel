// Note: This method is used to match the current parent title key with using the path name
// and is used by the side bar.
import type { T_HeaderItem, T_MenuCategory, T_SidebarItem, T_SidebarSubItem } from "@components/layout"
import { HeaderItems, SidebarItems } from "@components/layout"

export const findTitleKeyByPathname = (category: T_MenuCategory): string => {
    const { pathname } = window.location
    const items = SidebarItems.find(_ => _.category === category)?.items as T_SidebarItem[]
    for (const item of items) {
        if (item.link === pathname) return item.titleContentKey as string
        if (item.subItems) {
            const subItemMatch = item.subItems.find(subItem => subItem.link === pathname)
            if (subItemMatch) return item.titleContentKey as string
        }
    }
    return ""
}

export const findSubMenuItemByPathname = (category: T_MenuCategory): T_SidebarSubItem | null => {
    const { pathname } = window.location
    const items = SidebarItems.find(_ => _.category === category)?.items as T_SidebarItem[]
    for (const item of items) {
        // Returning null here, this condition shows that we don't have sub menus it's direct link.
        if (item.link === pathname) return null
        if (item.subItems) {
            const foundSubItem = item.subItems.find(subItem => subItem.link === pathname)
            if (foundSubItem) return foundSubItem
        }
    }
    return null
}

export const findCategoryByPathname = (): T_MenuCategory => {
    const { pathname } = window.location

    for (const sidebar of SidebarItems) {
        for (const item of sidebar.items) {
            // Check direct link
            if (item.link === pathname) {
                return sidebar.category
            }

            // Check subItems
            if (item.subItems) {
                const matchingSubItem = item.subItems.find(subItem => subItem.link === pathname)
                if (matchingSubItem) return sidebar.category
            }
        }
    }

    // Default to dashboard if no match found
    return "dashboard"
}

export const findHeaderItemByCategory = (category: T_MenuCategory): T_HeaderItem => {
    const item = HeaderItems.find(_ => _.category === category) as T_HeaderItem

    return item
}
