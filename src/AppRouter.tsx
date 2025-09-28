import { ProtectedRoute } from "@components/layout"
import { Toast } from "@components/template"
import { CommonProvider } from "@core/contexts"
import { AppRoutes } from "@core/utilities"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom"

import Dashboard from "./pages"
import { Login } from "./pages/auth/login"
import { Logout } from "./pages/auth/logout"
import { PlaceholderPage } from "./pages/PlaceholderPage"
import { ReportsTrafficList } from "./pages/reports/traffic-list"

const CommonProviderWrapper = () => {
    // Render
    return (
        <CommonProvider>
            <Toast />
            <Outlet />
        </CommonProvider>
    )
}

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<CommonProviderWrapper />}>
            {/* Auth pages */}
            <Route path={AppRoutes.auth.login} element={<Login />} />

            {/* Protected dashboard pages */}
            <Route element={<ProtectedRoute />}>
                <Route path={AppRoutes.index} element={<Dashboard />} />
                <Route path={AppRoutes.logout} element={<Logout />} />

                {/* Reports */}
                <Route path={AppRoutes.reports.traffic} element={<ReportsTrafficList />} />
                <Route path={AppRoutes.reports.trafficWithoutPlate} element={<PlaceholderPage />} />

                {/* Management */}
                <Route path={AppRoutes.management.users} element={<PlaceholderPage />} />
                <Route path={AppRoutes.management.roles} element={<PlaceholderPage />} />
                <Route path={AppRoutes.management.owners} element={<PlaceholderPage />} />
                <Route path={AppRoutes.management.vehicles} element={<PlaceholderPage />} />

                {/* Settings */}
                <Route path={AppRoutes.settings} element={<PlaceholderPage />} />
            </Route>
        </Route>
    )
)
