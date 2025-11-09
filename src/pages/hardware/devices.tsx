/* eslint-disable react/no-unstable-nested-components */
import { Status } from "@components/common"
import { Layout } from "@components/layout"
import {
    CreateDeviceModal,
    DeviceTypeColorMap,
    DeviceTypeKeyMap,
    EditDeviceModal,
    ViewDeviceModal,
} from "@components/pages/Hardware"
import { Button, Table, Text } from "@components/template"
import type { T_Device } from "@core/api"
import { API } from "@core/api"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2, Eye } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export const HardwareDevices = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { openModal, modalVisibility } = useModal()
    const [isFetching, setIsFetching] = useState(true)
    const [selected, setSelected] = useState<T_Device | null>(null)
    const [list, setList] = useState<T_Device[]>([])

    const tableColumns = [
        {
            name: t("device_name"),
            selector: (row: T_Device) => row.name,
        },
        {
            name: t("type"),
            cell: (row: T_Device) => (
                <Status variant={DeviceTypeColorMap[row.type]} contentKey={DeviceTypeKeyMap[row.type]} />
            ),
        },
        {
            name: t("ip_address"),
            cell: (row: T_Device) => <Text content={row.ip} variant="meta-1" className="font-courier" />,
        },
        {
            name: t("actions"),
            cell: (_: T_Device) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelected(_)
                            openModal(Modals.Access.Devices.View)
                        }}
                    >
                        <Eye size={20} className="text-neutral-700" />
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelected(_)
                            openModal(Modals.Access.Devices.Edit)
                        }}
                    >
                        <Edit2 size={20} className="text-neutral-700" />
                    </Button>
                </div>
            ),
            width: "120px",
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Access.Devices.Add)} />
        </div>
    )

    const fetchDevicesList = async () => {
        const { data } = await API.Device.FetchDevices()
        if (data) setList(data.fetchDevices)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchDevicesList()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Access.Devices.Add] && <CreateDeviceModal callback={fetchDevicesList} />}
            {modalVisibility[Modals.Access.Devices.View] && <ViewDeviceModal device={selected!} />}

            {modalVisibility[Modals.Access.Devices.Edit] && (
                <EditDeviceModal callback={fetchDevicesList} device={selected!} />
            )}

            <Table
                title="devices"
                data={list}
                columns={tableColumns}
                rowsPerPage={7}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
