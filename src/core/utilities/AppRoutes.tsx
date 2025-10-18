export const AppRoutes = {
    index: "/",
    logout: "/logout",

    auth: {
        login: "/auth/login",
    },

    reports: {
        traffic: "/reports/traffic",
        trafficWithoutPlate: "/reports/traffic-without-plate",
        trafficWithCard: "/reports/traffic-with-card",
    },

    management: {
        roles: {
            index: "/management/roles",
            add: "/management/roles/add",
            edit: "/management/roles/edit",
        },
        users: "/management/users",
        owners: "/management/owners",
        cards: "/management/cards",
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
