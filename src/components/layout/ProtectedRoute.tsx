import { getUserAccessToken } from "@core/functions"
import { AppRoutes } from "@core/utilities"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
    if (!getUserAccessToken()) return <Navigate to={AppRoutes.auth.login} />

    return <Outlet />
}
