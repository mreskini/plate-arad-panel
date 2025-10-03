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
        roles: "/management/roles",
        users: "/management/users",
        owners: "/management/owners",
    },

    settings: "/settings",
} as const
