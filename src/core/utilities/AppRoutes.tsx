export const AppRoutes = {
    index: "/",
    logout: "/logout",
    owners: "/management/owners",

    auth: {
        login: "/auth/login",
    },

    reports: {
        traffic: "/reports/traffic",
        trafficWithoutPlate: "/reports/traffic-without-plate",
        trafficWithCard: "/reports/traffic-with-card",
        trafficWithEmergency: "/reports/traffic-with-emergency",
    },

    management: {
        roles: {
            index: "/management/roles",
            add: "/management/roles/add",
            edit: "/management/roles/edit",
        },
        users: "/management/users",
        cards: "/management/cards",
    },
    software: {
        settings: "/software/settings",
        license: "/software/license",
    },

    access: {
        devices: "/hardware/devices",
        clients: "/hardware/clients",
        schedule: "/hardware/schedule",
        accessControl: "/hardware/access-control",
    },
} as const
