import { ProtectedRoute } from "@components/layout"
import { Toast } from "@components/template"
import { CommonProvider } from "@core/contexts"
import { AppRoutes } from "@core/utilities"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom"

import Dashboard from "./pages"
import { Login } from "./pages/auth/login"
import { Logout } from "./pages/auth/logout"
import { AddRole } from "./pages/management/add-role"
import { EditRole } from "./pages/management/edit-role"
import { OwnersList } from "./pages/management/owners-list"
import { UsersList } from "./pages/management/users-list"
import { UsersRoles } from "./pages/management/users-roles"
import { PlaceholderPage } from "./pages/PlaceholderPage"
import { ReportsTrafficList } from "./pages/reports/traffic-list"
import { ReportsWithoutPlateTrafficList } from "./pages/reports/without-plate-traffic-list"

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
                <Route path={AppRoutes.reports.trafficWithoutPlate} element={<ReportsWithoutPlateTrafficList />} />

                {/* Management */}
                <Route path={AppRoutes.management.users} element={<UsersList />} />

                <Route path={AppRoutes.management.roles.index} element={<UsersRoles />} />
                <Route path={AppRoutes.management.roles.add} element={<AddRole />} />
                <Route path={`${AppRoutes.management.roles.edit}/:token`} element={<EditRole />} />

                <Route path={AppRoutes.management.owners} element={<OwnersList />} />
                <Route path={AppRoutes.management.vehicles} element={<PlaceholderPage />} />

                {/* Settings */}
                <Route path={AppRoutes.settings} element={<PlaceholderPage />} />
            </Route>
        </Route>
    )
)
