import { Button, Text } from "@components/template"
import { filterSidebarItemsByPermissions } from "@core/functions"
import { useApp, useLayout } from "@core/stores"
import clsx from "clsx"
import { ArrowDown2, ArrowLeft2 } from "iconsax-reactjs"
import { range } from "lodash"
import { useNavigate } from "react-router-dom"

import { SidebarLogo } from "./SidebarLogo"
import { SidebarSubItem } from "./SidebarSubItem"
import type { T_SidebarItem } from "./static"
import { SidebarItems } from "./static"
import { useSidebar } from "./useSidebar"

export const Sidebar = () => {
    // States and hooks
    const navigate = useNavigate()
    const { permissions } = useApp()
    const { category, isAuthenticating } = useLayout()
    const { currentPath, currentMenu, openSubMenu, handleOpenSubMenu } = useSidebar()
    const items = SidebarItems.find(_ => _.category === category)?.items as T_SidebarItem[]
    const filteredItems = filterSidebarItemsByPermissions(items, permissions)

    // Methods
    const onParentMenuItemClick = (_: T_SidebarItem) => {
        if (_.subItems) handleOpenSubMenu(_.titleContentKey)
        else navigate(_.link as string)
    }

    // Render
    return (
        <div className="flex h-full flex-col bg-zinc-50 lg:min-w-64 border-l border-neutral-200">
            <SidebarLogo />

            <div className="flex grow flex-col gap-2.5 px-2 py-5 lg:px-3 lg:py-6 overflow-auto hide-scrollbar">
                {isAuthenticating &&
                    range(0, 5).map(_ => <div className="w-full h-[46px] bg-zinc-200 animate-pulse rounded-xl" />)}

                {!isAuthenticating &&
                    filteredItems.map(_ => {
                        let isActive
                        const isSubMenuOpen = openSubMenu === _.titleContentKey

                        if (_.subItems) isActive = currentMenu === _.titleContentKey
                        else isActive = currentPath === _.link

                        return (
                            <div key={_.titleContentKey}>
                                <Button
                                    key={_.titleContentKey}
                                    variant="ghost"
                                    className={clsx([
                                        "flex items-center justify-between rounded-xl px-3 py-2.5 w-full",
                                        isActive && "bg-blue-600 text-white",
                                        _.endItem && "mt-auto",
                                    ])}
                                    onClick={() => onParentMenuItemClick(_)}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className={clsx([isActive ? "text-white" : "text-zinc-800"])}>
                                            {_.icon}
                                        </div>

                                        <Text
                                            ns="common"
                                            contentKey={_.titleContentKey}
                                            variant="body"
                                            className={clsx([
                                                "hidden lg:block",
                                                isActive ? "text-white" : "text-zinc-800",
                                            ])}
                                        />
                                    </div>

                                    {_.subItems && (
                                        <div className={clsx([isActive ? "text-white" : "text-zinc-800"])}>
                                            {isSubMenuOpen ? <ArrowDown2 size={20} /> : <ArrowLeft2 size={20} />}
                                        </div>
                                    )}
                                </Button>
                                {_.subItems && isSubMenuOpen && (
                                    <div className="flex flex-col w-full">
                                        {_.subItems.map($ => {
                                            const isSubActive = currentPath === $.link
                                            if (!$.hidden)
                                                return (
                                                    <SidebarSubItem
                                                        isActive={isSubActive}
                                                        link={$.link}
                                                        titleContentKey={$.titleContentKey}
                                                    />
                                                )
                                            return null
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
