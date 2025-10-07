/* eslint-disable react/no-unstable-nested-components */
import { RoleElement, Status } from "@components/common"
import { Layout } from "@components/layout"
import { Button, Table, Text } from "@components/template"
import type { T_Role } from "@core/api"
import { API } from "@core/api"
import { formatNumber } from "@core/functions"
import { AppRoutes } from "@core/utilities"
import { Edit2 } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export const UsersRoles = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const navigate = useNavigate()
    const [tableData, setTableData] = useState<T_Role[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(true)

    const tableColumns: TableColumn<T_Role>[] = [
        {
            width: "100px",
            name: t("row"),
            cell: (_, rowIndex) => (
                <Text content={formatNumber(rowIndex + 1)} variant="meta-1" className="text-zinc-950" />
            ),
        },
        {
            name: t("role"),
            cell: (row: T_Role) => <RoleElement role={row.name} />,
        },
        {
            name: t("default"),
            cell: (row: T_Role) => (
                <Status contentKey={row.is_default ? "yes" : "no"} variant={row.is_default ? "success" : "error"} />
            ),
        },
        {
            width: "100px",
            name: t("actions"),
            cell: (row: T_Role) => (
                <Button variant="ghost" onClick={() => navigate(`${AppRoutes.management.roles.edit}/${row.token}`)}>
                    <Edit2 size={20} className="text-neutral-700" />
                </Button>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => navigate(AppRoutes.management.roles.add)} />
        </div>
    )

    // Methods
    const fetchRoles = async () => {
        setIsFetching(true)

        const { data } = await API.Role.FetchRoles()

        if (data) setTableData(data.fetchRoles)

        setIsFetching(false)
    }

    // Use effects
    useEffect(() => {
        fetchRoles()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            <Table
                title="users_roles"
                data={tableData}
                columns={tableColumns}
                rowsPerPage={7}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
