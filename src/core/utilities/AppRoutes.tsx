export const AppRoutes = {
    index: "/",
    logout: "/logout",

    auth: {
        login: "/auth/login",
    },

    management: {
        users: {
            list: "/management/users/list",
        },
        owners: {
            list: "/management/owners/list",
        },
    },

    vehicles: {
        list: "/vehicles/list",
    },

    reports: {
        traffic: {
            list: "/reports/traffic/list",
        },
    },

    settings: {
        software: {
            list: "/settings/software/list",
        },
        devices: {
            list: "/settings/devices/list",
        },
        pos: {
            list: "/settings/pos/list",
        },
    },
} as const
