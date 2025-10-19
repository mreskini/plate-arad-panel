/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import { AddScheduleModal, EditScheduleModal } from "@components/pages/Management/Schedule"
import { Button, Switch, Table } from "@components/template"
import type { T_FetchScheduleList, T_Schedule } from "@core/api"
import { formatDate, formatTime, sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2 } from "iconsax-reactjs"
import { range } from "lodash"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"

const PageSize = 7

export const ScheduleList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchScheduleList>([])
    const [selected, setSelected] = useState<T_Schedule | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    const tableColumns: TableColumn<T_Schedule>[] = [
        {
            name: t("title"),
            selector: (row: T_Schedule) => row.title,
        },
        {
            name: t("start_date"),
            selector: (row: T_Schedule) => formatDate(new Date(row.start_date)),
        },
        {
            name: t("end_date"),
            selector: (row: T_Schedule) => formatDate(new Date(row.end_date)),
        },
        {
            name: t("start_time"),
            selector: (row: T_Schedule) => formatTime(new Date(row.start_time)),
        },
        {
            name: t("end_time"),
            selector: (row: T_Schedule) => formatTime(new Date(row.end_time)),
        },

        {
            name: t("status"),
            cell: (row: T_Schedule) => <Switch checked={row.is_active} onSwitchToggle={() => {}} />,
        },
        {
            width: "80px",
            name: t("actions"),
            cell: (row: T_Schedule) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Management.Schedule.EditSchedule)
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
                onClick={() => openModal(Modals.Management.Schedule.AddSchedule)}
            />
        </div>
    )

    // Methods
    const fetchSchedules = async () => {
        await sleep(2000)

        const MockScheduleItems: T_FetchScheduleList = range(1, 11).map(i => ({
            title: `برنامه ${i}`,
            start_date: "2024-01-01T00:00:00Z",
            end_date: "2024-12-31T23:59:59Z",
            start_time: "2024-01-01T08:00:00Z",
            end_time: "2024-01-01T12:00:00Z",
            is_active: i % 2 === 0,
        }))

        setTableData(MockScheduleItems)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchSchedules()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Management.Schedule.AddSchedule] && <AddScheduleModal callback={fetchSchedules} />}

            {modalVisibility[Modals.Management.Schedule.EditSchedule] && (
                <EditScheduleModal callback={fetchSchedules} schedule={selected!} />
            )}

            <Table
                title="schedule"
                data={tableData}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
