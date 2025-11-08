import { ProtectedRoute } from "@components/layout"
import { Toast } from "@components/template"
import { CommonProvider } from "@core/contexts"
import { AppRoutes } from "@core/utilities"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom"

import Dashboard from "./pages"
import { Login } from "./pages/auth/login"
import { Logout } from "./pages/auth/logout"
import { HardwareDevices } from "./pages/hardware/devices"
import { Doors } from "./pages/hardware/doors"
import { AccessControl } from "./pages/management/access-control"
import { AddRole } from "./pages/management/add-role"
import { EditRole } from "./pages/management/edit-role"
import { IdentifiersList } from "./pages/management/identifiers-list"
import { OwnersList } from "./pages/management/owners-list"
import { ScheduleList } from "./pages/management/schedule-list"
import { UsersList } from "./pages/management/users-list"
import { UsersRoles } from "./pages/management/users-roles"
import { ReportsTrafficList } from "./pages/reports/traffic-list"
import { ReportsTrafficWithCardList } from "./pages/reports/traffic-with-card-list"
import { ReportsTrafficWithEmergencyList } from "./pages/reports/traffic-with-emergency-list"
import { ReportsWithoutPlateTrafficList } from "./pages/reports/without-plate-traffic-list"
import { License } from "./pages/software/license"
import { Configuration } from "./pages/software/settings"

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
                <Route path={AppRoutes.reports.trafficWithCard} element={<ReportsTrafficWithCardList />} />
                <Route path={AppRoutes.reports.trafficWithEmergency} element={<ReportsTrafficWithEmergencyList />} />

                {/* Management */}
                <Route path={AppRoutes.management.users} element={<UsersList />} />

                <Route path={AppRoutes.management.roles.index} element={<UsersRoles />} />
                <Route path={AppRoutes.management.roles.add} element={<AddRole />} />
                <Route path={`${AppRoutes.management.roles.edit}/:token`} element={<EditRole />} />
                <Route path={AppRoutes.owners} element={<OwnersList />} />
                <Route path={AppRoutes.management.cards} element={<IdentifiersList />} />

                {/* Software */}
                <Route path={AppRoutes.software.settings} element={<Configuration />} />
                <Route path={AppRoutes.software.license} element={<License />} />

                {/* Access */}
                <Route path={AppRoutes.access.clients} element={<Doors />} />
                <Route path={AppRoutes.access.devices} element={<HardwareDevices />} />
                <Route path={AppRoutes.access.schedule} element={<ScheduleList />} />
                <Route path={AppRoutes.access.accessControl} element={<AccessControl />} />
            </Route>
        </Route>
    )
)
