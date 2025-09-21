import { RouterProvider } from "react-router-dom"

import { AppRouter } from "./AppRouter"

export const App = () => {
    // Render
    return <RouterProvider router={AppRouter} />
}
