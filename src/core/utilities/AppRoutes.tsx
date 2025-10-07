export const AppRoutes = {
    index: "/",
    logout: "/logout",

    auth: {
        login: "/auth/login",
    },

    reports: {
        traffic: "/reports/traffic",
        trafficWithoutPlate: "/reports/traffic-without-plate",
    },

    management: {
        roles: {
            index: "/management/roles",
            add: "/management/roles/add",
            edit: "/management/roles/edit",
        },
        users: "/management/users",
        owners: "/management/owners",
    },

    software: {
        settings: "/software/settings",
        license: "/software/license",
    },

    hardware: {
        devices: "/hardware/devices",
        clients: "/hardware/clients",
    },
} as const
