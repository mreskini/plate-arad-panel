/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import { AddAccessControlModal, EditAccessControlModal } from "@components/pages/Access"
import { Button, Table } from "@components/template"
import { API, type T_AccessControl } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2 } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

const PageSize = 7

export const AccessControls = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_AccessControl[]>([])
    const [selected, setSelected] = useState<T_AccessControl | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    const tableColumns: TableColumn<T_AccessControl>[] = [
        {
            name: t("title"),
            selector: (row: T_AccessControl) => row.title,
        },
        {
            name: t("client"),
            selector: (row: T_AccessControl) => row.client.name,
        },
        {
            name: t("schedule"),
            selector: (row: T_AccessControl) => row.schedule.title,
        },
        {
            name: t("access_type"),
            selector: (_row: T_AccessControl, index?: number) => ((index ?? 0) % 3 === 0 ? "UHF و CSN" : "پلاک و CSN"), // TODO: Replace with real access type --- IGNORE ---
        },
        {
            width: "80px",
            name: t("actions"),
            cell: (row: T_AccessControl) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Access.AccessControl.Edit)
                            }}
                        />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Access.AccessControl.Add)} />
        </div>
    )

    // Methods
    const fetchAccessControls = async () => {
        const { data, error } = await API.Client.FetchAccessControls()
        if (data) setTableData(data.fetchAccessControls)
        if (error) toast.error(error)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchAccessControls()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Access.AccessControl.Add] && (
                <AddAccessControlModal callback={fetchAccessControls} />
            )}

            {modalVisibility[Modals.Access.AccessControl.Edit] && (
                <EditAccessControlModal callback={fetchAccessControls} accessControl={selected!} />
            )}

            <Table
                title="access_control"
                data={tableData}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
