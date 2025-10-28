/* eslint-disable react/no-unstable-nested-components */
import { RoleElement } from "@components/common"
import { Layout } from "@components/layout"
import { AddUserModal, EditUserModal } from "@components/pages/Management"
import { Button, Switch, Table } from "@components/template"
import type { T_FetchUsersList } from "@core/api"
import { API } from "@core/api"
import { formatDate } from "@core/functions"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { Edit2 } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

const PageSize = 7

export const UsersList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchUsersList>({ count: 0, items: [] })
    const [selected, setSelected] = useState<T_User | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [current, setCurrent] = useState(1)

    type T_User = T_FetchUsersList["items"][number]

    const tableColumns: TableColumn<T_User>[] = [
        {
            width: "75px",
            name: t("image"),
            cell: (row: T_User) => (
                <div className="size-10 rounded-full flex items-center justify-center">
                    <img
                        src={row.profile_image || Images.UserProfilePlaceholder}
                        alt={`${row.username} avatar`}
                        className="w-full h-auto rounded-full aspect-square"
                    />
                </div>
            ),
        },
        {
            name: t("username"),
            cell: (row: T_User) => <div className="font-mono">{row.username}</div>,
        },
        {
            name: t("fullname"),
            selector: (row: T_User) => row.fullname,
        },
        {
            name: t("status"),
            cell: (row: T_User) =>
                row.is_active ? (
                    <div className="bg-green-100 text-green-500 px-2 py-1 rounded-md">{t("active")}</div>
                ) : (
                    <div className="bg-red-100 text-red-400 px-2 py-1 rounded-md">{t("inactive")}</div>
                ),
        },
        {
            name: t("role"),
            cell: (row: T_User) => <RoleElement role={row.role.name} />,
        },
        {
            name: t("expiry_date"),
            selector: (row: T_User) => formatDate(new Date(row.expiration_date)),
        },
        {
            name: t("activation"),
            cell: (row: T_User) => (
                <Switch checked={row.is_active} onSwitchToggle={() => toggleUserAvailability(row.token)} />
            ),
        },
        {
            width: "80px",
            name: t("actions"),
            cell: (row: T_User) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Management.User.EditUser)
                            }}
                        />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Management.User.AddUser)} />
        </div>
    )

    // Methods
    const fetchUsers = async (page?: number) => {
        const target = page ?? current
        if (page) setCurrent(page)

        const { data } = await API.User.FetchUsersList({ body: { page: target, limit: PageSize } })

        if (data) setTableData(data.fetchUsersList)

        setIsFetching(false)
    }

    const toggleUserAvailability = async (userToken: string) => {
        const { data, error } = await API.User.ToggleUserStatus({ body: { token: userToken } })
        if (data) await fetchUsers(current)
        if (error) toast.error(error)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Management.User.AddUser] && <AddUserModal callback={fetchUsers} />}

            {modalVisibility[Modals.Management.User.EditUser] && (
                <EditUserModal callback={fetchUsers} user={selected!} />
            )}

            <Table
                title="users_list"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
                totalRows={tableData.count}
                paginationType="Remote"
                onChangePage={fetchUsers}
            />
        </Layout.Dashboard>
    )
}
