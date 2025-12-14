/* eslint-disable react/jsx-no-constructed-context-values */
import type { T_InputDropdownOption } from "@components/template"
import type { T_Client, T_FlatClient, T_FlatSchedule, T_Role } from "@core/api"
import { API, E_IdentifierType } from "@core/api"
import { useApp } from "@core/stores"
import { AppRoutes } from "@core/utilities"
import type { FC, ReactNode } from "react"
import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface I_Props {
    children: ReactNode
}

interface I_Context {
    fetchCurrentUser: Function
    fetchParkingInfo: Function
    fetchRoles: Function
    fetchFlatClients: Function
    fetchFlatSchedules: Function
    isLicenseAvailable: boolean
    onCardIdentifierSearch: (searchTerm: string, onlyAvailable?: boolean) => Promise<T_InputDropdownOption[]>
    onTagIdentifierSearch: (searchTerm: string, onlyAvailable?: boolean) => Promise<T_InputDropdownOption[]>
    onUserSearch: (searchTerm: string) => Promise<T_InputDropdownOption[]>
    onCustomerSearch: (searchTerm: string) => Promise<T_InputDropdownOption[]>
    fetchClients: () => Promise<T_Client[]>
}

const Initials: I_Context = {
    fetchCurrentUser: () => undefined,
    fetchParkingInfo: () => undefined,
    fetchRoles: () => undefined,
    fetchFlatClients: () => undefined,
    fetchFlatSchedules: () => undefined,
    isLicenseAvailable: false,
    onCardIdentifierSearch: async (): Promise<T_InputDropdownOption[]> => [],
    onTagIdentifierSearch: async (): Promise<T_InputDropdownOption[]> => [],
    onUserSearch: async (): Promise<T_InputDropdownOption[]> => [],
    onCustomerSearch: async (): Promise<T_InputDropdownOption[]> => [],
    fetchClients: async (): Promise<T_Client[]> => [],
}

const Context = createContext<I_Context>(Initials)

const useCommon = () => useContext(Context)

const CommonProvider: FC<I_Props> = ({ children }) => {
    // States and Hooks
    const { setCurrentUser, setPermissions, setParking, parking } = useApp()
    const navigate = useNavigate()

    const isLicenseAvailable = useMemo(() => {
        return !!(parking?.license && parking?.server_uuid && (parking?.clients_count ?? 0) > 0)
    }, [parking?.license, parking?.server_uuid, parking?.clients_count])

    // Methods
    const fetchCurrentUser = async () => {
        const { data, error } = await API.User.CurrentUser()
        if (data) {
            setCurrentUser(data.currentUser)
            const permissions = data.currentUser.role.permissions.map(_ => _.link)
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

    const fetchRoles = async (): Promise<T_Role[]> => {
        const { data } = await API.Role.FetchRoles()
        if (data) return data.fetchRoles
        return []
    }

    const fetchFlatClients = async (): Promise<T_FlatClient[]> => {
        const { data } = await API.Client.FetchFlatClients()
        if (data) return data.fetchClients
        return []
    }

    const fetchFlatSchedules = async (): Promise<T_FlatSchedule[]> => {
        const { data } = await API.Client.FetchFlatSchedules()
        if (data) return data.fetchSchedules
        return []
    }

    const onCardIdentifierSearch = async (
        searchTerm: string,
        onlyAvailable?: boolean
    ): Promise<T_InputDropdownOption[]> => {
        const { data } = await API.Identifier.SearchIdentifiers({
            body: { search: searchTerm, type: E_IdentifierType.Card, ...(onlyAvailable && { only_available: true }) },
        })

        if (data && data.searchIdentifiers)
            return data.searchIdentifiers.map(_ => ({ label: _.number, value: _.token }))

        return []
    }

    const onTagIdentifierSearch = async (
        searchTerm: string,
        onlyAvailable?: boolean
    ): Promise<T_InputDropdownOption[]> => {
        const { data } = await API.Identifier.SearchIdentifiers({
            body: { search: searchTerm, type: E_IdentifierType.Tag, ...(onlyAvailable && { only_available: true }) },
        })

        if (data && data.searchIdentifiers)
            return data.searchIdentifiers.map(_ => ({ label: _.number, value: _.token }))

        return []
    }

    const onUserSearch = async (searchTerm: string): Promise<T_InputDropdownOption[]> => {
        const { data } = await API.User.SearchUsersByFullname({ body: { search: searchTerm } })

        if (data && data.searchUsersByFullname)
            return data.searchUsersByFullname.map(_ => ({ label: _.fullname, value: _.token }))

        return []
    }

    const onCustomerSearch = async (searchTerm: string): Promise<T_InputDropdownOption[]> => {
        const { data } = await API.Customer.SearchCustomers({ body: { search: searchTerm } })

        if (data && data.searchCustomers)
            return data.searchCustomers.map(_ => ({ label: `${_.first_name} ${_.last_name}`, value: _.token }))

        return []
    }

    const fetchClients = async (): Promise<T_Client[]> => {
        const { data, error } = await API.Client.FetchClients()
        if (error) toast.error(error)
        if (data) return data.fetchClients

        return []
    }

    // Data binding
    const value = {
        fetchCurrentUser,
        fetchParkingInfo,
        fetchRoles,
        fetchFlatClients,
        fetchFlatSchedules,
        fetchClients,
        isLicenseAvailable,
        onCardIdentifierSearch,
        onTagIdentifierSearch,
        onUserSearch,
        onCustomerSearch,
    }

    // Render
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export { CommonProvider, useCommon }
