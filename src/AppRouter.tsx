import { ProtectedRoute } from "@components/layout"
import { Toast } from "@components/template"
import { CommonProvider, UHFWebSocketProvider } from "@core/contexts"
import { AppRoutes } from "@core/utilities"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom"

import Dashboard from "./pages"
import { AccessControls } from "./pages/access/access-control"
import { Devices } from "./pages/access/devices"
import { Doors } from "./pages/access/doors"
import { Schedules } from "./pages/access/schedule-list"
import { Login } from "./pages/auth/login"
import { Logout } from "./pages/auth/logout"
import { AddRole } from "./pages/management/add-role"
import { EditRole } from "./pages/management/edit-role"
import { IdentifiersList } from "./pages/management/identifiers-list"
import { OwnersList } from "./pages/management/owners-list"
import { UsersList } from "./pages/management/users-list"
import { UsersRoles } from "./pages/management/users-roles"
import { ReportsTrafficList } from "./pages/reports/traffic-list"
import { ReportsTrafficWithCardList } from "./pages/reports/traffic-with-card-list"
import { ReportsTrafficWithEmergencyList } from "./pages/reports/traffic-with-emergency-list"
import { ReportsWithoutPlateTrafficList } from "./pages/reports/without-plate-traffic-list"
import { Configuration } from "./pages/settings/configuration"
import { License } from "./pages/settings/license"

const CommonProviderWrapper = () => {
    // Render
    return (
        <CommonProvider>
            <UHFWebSocketProvider>
                <Toast />
                <Outlet />
            </UHFWebSocketProvider>
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
                <Route path={AppRoutes.reports.trafficWithCard} element={<ReportsTrafficWithCardList />} />
                <Route path={AppRoutes.reports.trafficWithEmergency} element={<ReportsTrafficWithEmergencyList />} />

                {/* Management */}
                <Route path={AppRoutes.management.users} element={<UsersList />} />

                <Route path={AppRoutes.management.roles.index} element={<UsersRoles />} />
                <Route path={AppRoutes.management.roles.add} element={<AddRole />} />
                <Route path={`${AppRoutes.management.roles.edit}/:token`} element={<EditRole />} />
                <Route path={AppRoutes.owners} element={<OwnersList />} />
                <Route path={AppRoutes.management.identifiers} element={<IdentifiersList />} />

                {/* Settings */}
                <Route path={AppRoutes.settings.configuration} element={<Configuration />} />
                <Route path={AppRoutes.settings.license} element={<License />} />

                {/* Access */}
                <Route path={AppRoutes.access.doors} element={<Doors />} />
                <Route path={AppRoutes.access.devices} element={<Devices />} />
                <Route path={AppRoutes.access.schedule} element={<Schedules />} />
                <Route path={AppRoutes.access.accessControl} element={<AccessControls />} />
            </Route>
        </Route>
    )
)
