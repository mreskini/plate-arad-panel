/* eslint-disable react/no-unstable-nested-components */
import { Status } from "@components/common"
import { Layout } from "@components/layout"
import { AddClientModal, ClientTypeKeyMap, EditClientModal, ViewClientModal } from "@components/pages/Hardware"
import { Button, Table, useNotify } from "@components/template"
import { E_ClientType, E_DeviceType, type T_Client } from "@core/api"
import { formatNumber, sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2, Eye, Trash } from "iconsax-reactjs"
import { range } from "lodash"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export const Clients = () => {
    // States and hooks
    const { notify } = useNotify()
    const { t } = useTranslation("tables")
    const { t: tCommon } = useTranslation("common")
    const { openModal, modalVisibility } = useModal()
    const [clients, setClients] = useState<T_Client[]>([])
    const [selected, setSelected] = useState<T_Client | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    // const { isLicenseAvailable } = useCommon()

    const tableColumns = [
        {
            name: t("client_name"),
            selector: (row: T_Client) => row.name,
        },
        {
            name: t("client_type"),
            selector: (row: T_Client) => tCommon(ClientTypeKeyMap[row.type]),
        },
        {
            name: t("ip_address"),
            selector: (row: T_Client) => row.ip_address,
        },
        {
            name: t("has_operator"),
            cell: (row: T_Client) => (
                <Status
                    contentKey={row.has_operator ? "yes" : "no"}
                    variant={row.has_operator ? "success" : "warning"}
                />
            ),
        },
        {
            name: t("pos_device"),
            cell: (row: T_Client) => (row.pos ? formatNumber(row.pos.num, "fa") : ""),
        },
        {
            width: "150px",
            name: t("actions"),
            cell: (row: T_Client) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelected(row)
                            openModal(Modals.Hardware.Client.View)
                        }}
                    >
                        <Eye size={20} className="text-neutral-700" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelected(row)
                            openModal(Modals.Hardware.Client.Edit)
                        }}
                    >
                        <Edit2 size={20} className="text-neutral-700" />
                    </Button>
                    <Button variant="ghost">
                        <Trash size={20} className="text-red-500 hover:text-red-600" onClick={() => deleteClient()} />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Hardware.Client.Add)} />
        </div>
    )

    const fetchClients = async () => {
        await sleep(2000)

        setClients(
            range(1, 10).map(i => ({
                token: `client-token-${i}`,
                type: i % 2 === 0 ? E_ClientType.Input : E_ClientType.Output,
                name: `کلاینت ${i}`,
                ip_address: `192.168.1.${i}`,
                has_operator: i % 2 === 0,
                pos:
                    i % 3 === 0
                        ? { token: `pos-token-${i}`, ip: `192.168.1.${i + 100}`, num: i, terminal: i + 10 }
                        : null,
                relay:
                    i % 2 === 0
                        ? {
                              token: `device-token-${i}`,
                              type: E_DeviceType.Relay,
                              name: `Relay Device ${i}`,
                              ip: `192.168.1.${i + 200}`,
                          }
                        : null,
                plate_cam:
                    i % 2 !== 0
                        ? {
                              token: `device-token-${i}`,
                              type: E_DeviceType.PlateCamera,
                              name: `Plate Cam ${i}`,
                              ip: `192.168.1.${i + 300}`,
                          }
                        : null,
            }))
        )

        setIsFetching(false)
    }
    const deleteClient = async () => {
        await sleep(2000)
        notify("client_deleted_successfully", "success")
    }

    useEffect(() => {
        fetchClients()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Hardware.Client.Add] && <AddClientModal callback={fetchClients} />}

            {modalVisibility[Modals.Hardware.Client.Edit] && (
                <EditClientModal callback={fetchClients} client={selected!} />
            )}

            {modalVisibility[Modals.Hardware.Client.View] && <ViewClientModal client={selected!} />}

            {/* {!isLicenseAvailable && (
                <Notice
                    contentKey="license_not_available_please_upload_license_file"
                    ns="alerts"
                    wrapperClassName="mb-4"
                />
            )} */}

            <Table
                title="clients"
                data={clients}
                columns={tableColumns}
                rowsPerPage={10}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
