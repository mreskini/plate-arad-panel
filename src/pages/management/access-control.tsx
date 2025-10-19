/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import { AddAccessControlModal, EditAccessControlModal } from "@components/pages/Management"
import { Button, Table } from "@components/template"
import type { T_AccessControl, T_FetchAccessControl } from "@core/api"
import { sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2 } from "iconsax-reactjs"
import { range } from "lodash"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"

const PageSize = 7

export const AccessControl = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchAccessControl>({ count: 0, items: [] })
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
                                openModal(Modals.Management.AccessControl.EditAccessControl)
                            }}
                        />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button
                variant="primary"
                contentKey="add"
                onClick={() => openModal(Modals.Management.AccessControl.AddAccessControl)}
            />
        </div>
    )

    // Methods
    const fetchAccessControls = async () => {
        await sleep(2000)

        const MockAccessControlItems: T_FetchAccessControl = {
            count: 23,
            items: range(1, 8).map(i => ({
                token: `access-control-token-${i}`,
                title: `کنترل دسترسی شماره ${i}`,
                client: {
                    token: `client-token-${i}`,
                    name: `کلاینت شماره ${i}`,
                },
                schedule: {
                    title: `برنامه زمانبندی شماره ${i}`,
                    start_date: "2024-01-01",
                    end_date: "2024-12-31",
                    start_time: "08:00",
                    end_time: "18:00",
                    is_active: true,
                },
                control: {
                    plate: i % 2 === 0,
                    UHF: i % 3 === 0,
                    CSN: i % 4 === 0,
                },
            })),
        }

        setTableData(MockAccessControlItems)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchAccessControls()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Management.AccessControl.AddAccessControl] && (
                <AddAccessControlModal callback={fetchAccessControls} />
            )}

            {modalVisibility[Modals.Management.AccessControl.EditAccessControl] && (
                <EditAccessControlModal callback={fetchAccessControls} accessControl={selected!} />
            )}

            <Table
                title="access_control"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
                totalRows={tableData.count}
                paginationType="Remote"
                onChangePage={fetchAccessControls}
            />
        </Layout.Dashboard>
    )
}
