/* eslint-disable react/no-unstable-nested-components */
import { Status } from "@components/common"
import { Layout } from "@components/layout"
import { DeviceTypeColorMap, DeviceTypeKeyMap } from "@components/pages/Access"
import { Table } from "@components/template"
import { API, type T_PingAllDevices } from "@core/api"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"

const PageSize = 7

export const SettingsDevicesPing = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const [isFetching, setIsFetching] = useState(true)
    const [tableData, setTableData] = useState<T_PingAllDevices[]>([])

    const tableColumns: TableColumn<T_PingAllDevices>[] = [
        {
            name: t("device_name"),
            selector: (row: T_PingAllDevices) => row.name,
        },
        {
            name: t("type"),
            cell: (row: T_PingAllDevices) => (
                <Status variant={DeviceTypeColorMap[row.type]} contentKey={DeviceTypeKeyMap[row.type]} />
            ),
        },
        {
            name: t("ip_address"),
            selector: (row: T_PingAllDevices) => row.ip,
        },
        {
            name: t("status"),
            cell: (row: T_PingAllDevices) => (
                <Status
                    variant={row.is_alive ? "success" : "error"}
                    contentKey={row.is_alive ? "active" : "inactive"}
                />
            ),
        },
    ]

    // Methods
    const pingAllDevices = async () => {
        const { data } = await API.Device.PingAllDevices()
        if (data) setTableData(data.pingAllDevices)
        setIsFetching(false)
    }

    // Use effects
    useEffect(() => {
        pingAllDevices()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            <Table
                title="ping_devices"
                data={tableData}
                columns={tableColumns}
                rowsPerPage={PageSize}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
