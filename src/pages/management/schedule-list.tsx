/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import { AddScheduleModal, EditScheduleModal } from "@components/pages/Hardware"
import { Button, Table } from "@components/template"
import { API, type T_Schedule } from "@core/api"
import { formatDate, formatTime } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2 } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

const PageSize = 7

export const ScheduleList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_Schedule[]>([])
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
            selector: (row: T_Schedule) => (row.end_date ? formatDate(new Date(row.end_date)) : ""),
        },
        {
            name: t("start_time"),
            selector: (row: T_Schedule) => formatTime(row.start_time),
        },
        {
            name: t("end_time"),
            selector: (row: T_Schedule) => formatTime(row.end_time),
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
        const { data, error } = await API.Client.FetchSchedules()
        if (data) setTableData(data.fetchSchedules)
        if (error) toast.error(error)
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
