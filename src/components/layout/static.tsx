import { AppRoutes } from "@core/utilities"
import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import {
    Car,
    CardPos,
    Code1,
    Devices,
    Element4,
    Profile,
    SecurityUser,
    Setting2,
    Signpost,
    TableDocument,
    UserTag,
} from "iconsax-reactjs"
import type { JSXElementConstructor, ReactElement } from "react"

// Note: The hidden property in T_SidebarSubItem will be set `true` only for the pages that are in the app
// but they won't be listed in the sidebar. This is to make sure the category and sidebar logics won't break.

export type T_MenuCategory = "dashboard" | "management" | "vehicles" | "reports" | "settings"

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
    {
        category: "management",
        titleContentKey: "management",
        icon: <SecurityUser className="size-5" />,
    },
    {
        category: "vehicles",
        titleContentKey: "vehicles",
        icon: <Car className="size-5" />,
    },
    {
        category: "reports",
        titleContentKey: "reports",
        icon: <TableDocument className="size-5" />,
    },

    {
        category: "settings",
        titleContentKey: "settings",
        icon: <Setting2 className="size-5" />,
    },
]

export type T_Sidebar = {
    category: T_MenuCategory
    items: T_SidebarItem[]
}

export const SidebarItems: T_Sidebar[] = [
    {
        category: "dashboard",
        items: [{ icon: <Element4 className="size-6" />, titleContentKey: "dashboard", link: AppRoutes.index }],
    },
    {
        category: "management",
        items: [
            {
                icon: <Profile className="size-6" />,
                titleContentKey: "users",
                link: AppRoutes.management.users.list,
            },
            {
                icon: <UserTag className="size-6" />,
                titleContentKey: "owners",
                link: AppRoutes.management.owners.list,
            },
        ],
    },
    {
        category: "vehicles",
        items: [
            {
                icon: <Car className="size-6" />,
                titleContentKey: "vehicles",
                link: AppRoutes.vehicles.list,
            },
        ],
    },
    {
        category: "reports",
        items: [
            {
                icon: <Signpost className="size-6" />,
                titleContentKey: "traffic",
                link: AppRoutes.reports.traffic.list,
            },
        ],
    },

    {
        category: "settings",
        items: [
            {
                icon: <Code1 className="size-6" />,
                titleContentKey: "software",
                link: AppRoutes.settings.software.list,
            },
            {
                icon: <Devices className="size-6" />,
                titleContentKey: "devices",
                link: AppRoutes.settings.devices.list,
            },
            {
                icon: <CardPos className="size-6" />,
                titleContentKey: "pos",
                link: AppRoutes.settings.pos.list,
            },
        ],
    },
]
