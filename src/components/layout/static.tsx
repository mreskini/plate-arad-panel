import { AppRoutes } from "@core/utilities"
import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import { Book, Element4, Setting2, UserSquare } from "iconsax-reactjs"
import type { JSXElementConstructor, ReactElement } from "react"

export type T_MenuCategory = "dashboard"

export type T_SidebarSubItem = {
    titleContentKey: KeysWithoutReturnObjects[FlatNamespace]
    link: string
    hidden?: boolean
}

export type T_SidebarItem = {
    icon: ReactElement<any, string | JSXElementConstructor<any>>
    titleContentKey: KeysWithoutReturnObjects[FlatNamespace]
    link?: string
    endItem?: boolean
    subItems?: T_SidebarSubItem[]
}

export type T_HeaderItem = {
    category: T_MenuCategory
    titleContentKey: KeysWithoutReturnObjects[FlatNamespace]
    icon: ReactElement<any, string | JSXElementConstructor<any>>
}

export const HeaderItems: T_HeaderItem[] = [
    {
        category: "dashboard",
        titleContentKey: "dashboard",
        icon: <Element4 className="size-5" />,
    },
]

export type T_Sidebar = {
    category: T_MenuCategory
    items: T_SidebarItem[]
}

export const SidebarItems: T_Sidebar[] = [
    {
        category: "dashboard",
        items: [
            {
                icon: <Element4 className="size-6" />,
                titleContentKey: "dashboard",
                link: AppRoutes.index,
            },
            {
                icon: <Book className="size-6" />,
                titleContentKey: "reports",
                subItems: [
                    {
                        titleContentKey: "normal_traffic",
                        link: AppRoutes.reports.traffic,
                    },
                    {
                        titleContentKey: "traffic_without_plate",
                        link: AppRoutes.reports.trafficWithoutPlate,
                    },
                ],
            },
            {
                icon: <UserSquare className="size-6" />,
                titleContentKey: "management",
                subItems: [
                    {
                        titleContentKey: "roles",
                        link: AppRoutes.management.roles,
                    },
                    {
                        titleContentKey: "users",
                        link: AppRoutes.management.users,
                    },
                    {
                        titleContentKey: "owners",
                        link: AppRoutes.management.owners,
                    },
                ],
            },
            {
                icon: <Setting2 className="size-6" />,
                titleContentKey: "settings",
                link: AppRoutes.settings,
            },
        ],
    },
]
