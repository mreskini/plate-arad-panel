// Note: This component is automatic and will create the hierarchy by using the sidebar menu items.
// Please make sure not to use in pages that are demo or not listed in the sidebar menu items.
import type { T_HeaderItem, T_SidebarSubItem } from "@components/layout"
import { findHeaderItemByCategory, findSubMenuItemByPathname, findTitleKeyByPathname } from "@core/functions"
import { useLayout } from "@core/stores"
import clsx from "clsx"
import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import { ArrowLeft2 } from "iconsax-reactjs"
import { useEffect, useState } from "react"

import { Text } from "../Text"

type T_Key = KeysWithoutReturnObjects[FlatNamespace]

export const Breadcrumb = () => {
    // States and Hooks
    const [parent, setParent] = useState<T_Key>("dashboard")
    const { category } = useLayout()
    const [childNode, setChildNode] = useState<T_SidebarSubItem | null>(null)
    const [headerItem, setHeaderItem] = useState<T_HeaderItem | null>(null)

    // UseEffects
    useEffect(() => {
        const parentTitle = findTitleKeyByPathname(category)
        const cn = findSubMenuItemByPathname(category)
        const item = findHeaderItemByCategory(category)
        setParent(parentTitle as T_Key)
        setChildNode(cn)
        setHeaderItem(item)
    }, [window.location.pathname])

    // Render
    if (headerItem)
        return (
            <div className="flex items-center gap-2">
                <Text variant="meta-1" className="text-neutral-600" contentKey={headerItem.titleContentKey} />
                <ArrowLeft2 variant="Bold" className="text-neutral-300" size={16} />
                <Text
                    variant="meta-1"
                    className={clsx([childNode ? "text-neutral-600" : "text-blue-500"])}
                    contentKey={parent}
                />
                {childNode && (
                    <>
                        <ArrowLeft2 variant="Bold" className="text-neutral-300" size={16} />
                        <Text variant="meta-1" className="text-blue-500" contentKey={childNode.titleContentKey} />
                    </>
                )}
            </div>
        )

    return <div />
}
