import { ProtectedRoute } from "@components/layout"
import { Toast } from "@components/template"
import { CommonProvider } from "@core/contexts"
import { AppRoutes } from "@core/utilities"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom"

import Dashboard from "./pages"
import { Login } from "./pages/auth/login"
import { Logout } from "./pages/auth/logout"
import { PlaceholderPage } from "./pages/PlaceholderPage"

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

                {/* Management */}
                <Route path={AppRoutes.management.users.list} element={<PlaceholderPage />} />
                <Route path={AppRoutes.management.owners.list} element={<PlaceholderPage />} />

                {/* Reports */}
                <Route path={AppRoutes.reports.traffic.list} element={<PlaceholderPage />} />

                {/* Settings */}
                <Route path={AppRoutes.settings.software.list} element={<PlaceholderPage />} />
                <Route path={AppRoutes.settings.pos.list} element={<PlaceholderPage />} />
                <Route path={AppRoutes.settings.devices.list} element={<PlaceholderPage />} />

                {/* Vehicles */}
                <Route path={AppRoutes.vehicles.list} element={<PlaceholderPage />} />
            </Route>
        </Route>
    )
)
