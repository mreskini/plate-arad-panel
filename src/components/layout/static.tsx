import { AppRoutes } from "@core/utilities"
import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import { Book, Camera, Element4, People, Setting2, UserSquare } from "iconsax-reactjs"
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
                titleContentKey: "monitoring",
                link: AppRoutes.index,
            },
            {
                icon: <UserSquare className="size-6" />,
                titleContentKey: "management",
                subItems: [
                    {
                        titleContentKey: "users_list",
                        link: AppRoutes.management.users,
                    },
                    {
                        titleContentKey: "users_roles",
                        link: AppRoutes.management.roles.index,
                    },
                    {
                        titleContentKey: "identifiers_list",
                        link: AppRoutes.management.identifiers,
                    },
                ],
            },
            {
                icon: <People className="size-6" />,
                titleContentKey: "owners",
                link: AppRoutes.owners,
            },
            {
                icon: <Book className="size-6" />,
                titleContentKey: "reports",
                subItems: [
                    {
                        titleContentKey: "traffic",
                        link: AppRoutes.reports.traffic,
                    },
                    // TODO: Remove unneeded report links or implement them
                    // {
                    //     titleContentKey: "traffic_without_plate",
                    //     link: AppRoutes.reports.trafficWithoutPlate,
                    // },
                    // {
                    //     titleContentKey: "traffic_with_card",
                    //     link: AppRoutes.reports.trafficWithCard,
                    // },
                    // {
                    //     titleContentKey: "traffic_with_emergency",
                    //     link: AppRoutes.reports.trafficWithEmergency,
                    // },
                ],
            },
            {
                icon: <Camera className="size-6" />,
                titleContentKey: "access",
                subItems: [
                    {
                        titleContentKey: "access_control",
                        link: AppRoutes.access.accessControl,
                    },
                    {
                        titleContentKey: "schedule",
                        link: AppRoutes.access.schedule,
                    },
                    {
                        titleContentKey: "devices",
                        link: AppRoutes.access.devices,
                    },
                    {
                        titleContentKey: "doors",
                        link: AppRoutes.access.doors,
                    },
                ],
            },
            {
                icon: <Setting2 className="size-6" />,
                titleContentKey: "settings",
                subItems: [
                    {
                        titleContentKey: "license",
                        link: AppRoutes.settings.license,
                    },
                    {
                        titleContentKey: "configuration",
                        link: AppRoutes.settings.configuration,
                    },
                ],
            },
        ],
    },
]
