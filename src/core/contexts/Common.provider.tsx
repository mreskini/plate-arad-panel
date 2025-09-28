/* eslint-disable react/jsx-no-constructed-context-values */
import type { T_InputDropdownOption } from "@components/template"
import { API } from "@core/api"
import { sleep } from "@core/functions"
import { useApp } from "@core/stores"
import { AppRoutes } from "@core/utilities"
import type { FC, ReactNode } from "react"
import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"

interface I_Props {
    children: ReactNode
}

interface I_Context {
    fetchCurrentUser: Function
    fetchParkingInfo: Function
    onOwnerSearch: (searchTerm: string) => Promise<T_InputDropdownOption[]>
}

const Initials: I_Context = {
    fetchCurrentUser: () => undefined,
    fetchParkingInfo: () => undefined,
    onOwnerSearch: async (): Promise<T_InputDropdownOption[]> => [],
}

const Context = createContext<I_Context>(Initials)

const useCommon = () => useContext(Context)

const CommonProvider: FC<I_Props> = ({ children }) => {
    // States and Hooks
    const { setCurrentUser, setPermissions, setParking } = useApp()
    const navigate = useNavigate()

    // Methods
    const fetchCurrentUser = async () => {
        const { data, error } = await API.User.CurrentUser()
        if (data) {
            setCurrentUser(data.currentUser)

            // TODO: Uncomment after API integration
            // const permissions = data.currentUser.role.permissions.map(_ => _.link)

            const permissions = [
                "/",
                "/reports/traffic",
                "/reports/traffic-without-plate",
                "/management/roles",
                "/management/users",
                "/management/owners",
                "/management/vehicles",
                "/settings",
            ]
            setPermissions(permissions)
        }
        if (error) {
            setPermissions([])
            navigate(AppRoutes.auth.login, { replace: true })
        }
    }

    const fetchParkingInfo = async () => {
        const { data } = await API.Parking.ParkingInfo()
        if (data) setParking(data.parkingInfo)
    }

    // eslint-disable-next-line unused-imports/no-unused-vars
    const onOwnerSearch = async (searchTerm: string): Promise<T_InputDropdownOption[]> => {
        // const { data } = await API.Owner.SearchOwnersByFullname({ body: { search: searchTerm } })

        // if (data && data.searchOwnersByFullname)
        //     return data.searchOwnersByFullname.map(_ => ({ label: _.fullname, value: _.token }))

        await sleep(2000)

        return []
    }

    // Data binding
    const value = {
        fetchCurrentUser,
        fetchParkingInfo,
        onOwnerSearch,
    }

    // Render
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export { CommonProvider, useCommon }
