import { findCategoryByPathname, findTitleKeyByPathname } from "@core/functions"
import { useLayout } from "@core/stores"
import { useEffect, useState } from "react"

export const useSidebar = () => {
    // States and Hooks
    const [currentPath, setCurrentPath] = useState("")
    const { currentMenu, setCurrentMenu, openSubMenu, setOpenSubMenu, setCategory } = useLayout()

    // Methods
    const handleOpenSubMenu = (title: string) => setOpenSubMenu(openSubMenu === title ? null : title)

    // UseEffects
    useEffect(() => {
        const cat = findCategoryByPathname()
        setCategory(cat)

        const cp = window.location.pathname
        setCurrentPath(cp)

        const titleKey = findTitleKeyByPathname(cat)
        setCurrentMenu(titleKey)
    }, [window.location.pathname])

    return {
        currentPath,
        currentMenu,
        openSubMenu,
        handleOpenSubMenu,
    }
}
