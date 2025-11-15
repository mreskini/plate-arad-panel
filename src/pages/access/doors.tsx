/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import {
    AddClientModal,
    CameraBrandOptions,
    ClientTypeKeyMap,
    EditClientModal,
    ViewClientModal,
} from "@components/pages/Access"
import { Button, Notice, Table, Text } from "@components/template"
import type { T_Client } from "@core/api"
import { API } from "@core/api"
import { useCommon } from "@core/contexts"
import { useApp, useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Edit2, Eye } from "iconsax-reactjs"
import { find } from "lodash"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

export const Doors = () => {
    // States and hooks
    const { parking } = useApp()
    const { fetchParkingInfo } = useCommon()
    const { t } = useTranslation("tables")
    const { t: tCommon } = useTranslation("common")
    const { openModal, modalVisibility } = useModal()
    const [clients, setClients] = useState<T_Client[]>([])
    const [selected, setSelected] = useState<T_Client | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [isAddClientButtonDisabled, setIsAddClientButtonDisabled] = useState<boolean>(false)
    const { isLicenseAvailable } = useCommon()

    const tableColumns = [
        {
            name: t("door_name"),
            selector: (row: T_Client) => row.name,
        },
        {
            name: t("door_type"),
            selector: (row: T_Client) => tCommon(ClientTypeKeyMap[row.type]),
        },
        {
            name: t("camera_ip"),
            cell: (row: T_Client) =>
                row.camera?.ip ? <Text content={row.camera?.ip} variant="meta-1" className="font-courier" /> : "",
        },
        {
            name: t("camera_brand"),
            cell: (row: T_Client) =>
                row.camera?.brand_name ? (
                    <Text
                        contentKey={find(CameraBrandOptions, { value: row.camera.brand_name })?.labelKey}
                        variant="meta-1"
                        ns="input"
                    />
                ) : (
                    ""
                ),
        },
        {
            name: t("controller_ip"),
            cell: (row: T_Client) =>
                row.relay?.ip ? <Text content={row.relay?.ip} variant="meta-1" className="font-courier" /> : "",
        },
        {
            name: t("controller_channel_number"),
            cell: (row: T_Client) => (
                <>
                    {row.relay?.channel === 0 && <Text contentKey="zero" variant="meta-2" />}
                    {row.relay?.channel === 1 && <Text contentKey="one" variant="meta-2" />}
                </>
            ),
        },
        {
            name: t("reader_ip"),
            cell: (row: T_Client) =>
                row.camera?.ip ? <Text content={row.reader?.ip} variant="meta-1" className="font-courier" /> : "",
        },
        {
            name: t("reader_brand"),
            cell: (row: T_Client) =>
                row.reader?.brand_name ? (
                    <Text content={row.reader?.brand_name} variant="meta-1" className="font-courier" />
                ) : (
                    ""
                ),
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
                            openModal(Modals.Access.Door.View)
                        }}
                    >
                        <Eye size={20} className="text-neutral-700" />
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelected(row)
                            openModal(Modals.Access.Door.Edit)
                        }}
                    >
                        <Edit2 size={20} className="text-neutral-700" />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button
                variant="primary"
                contentKey={isAddClientButtonDisabled ? "capacity_full" : "add"}
                onClick={() => openModal(Modals.Access.Door.Add)}
                disabled={isAddClientButtonDisabled || isFetching}
            />
        </div>
    )

    // Methods
    const fetchClients = async () => {
        const { data, error } = await API.Client.FetchClients()
        if (data) setClients(data.fetchClients)
        if (error) toast.error(error)
        setIsFetching(false)
    }

    // Use effects
    useEffect(() => {
        fetchClients()
        fetchParkingInfo()
    }, [])

    useEffect(() => {
        setIsAddClientButtonDisabled(!!parking?.clients_count && clients.length >= parking?.clients_count)
    }, [clients, parking])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Access.Door.Add] && <AddClientModal callback={fetchClients} />}
            {modalVisibility[Modals.Access.Door.Edit] && <EditClientModal callback={fetchClients} client={selected!} />}

            {modalVisibility[Modals.Access.Door.View] && <ViewClientModal client={selected!} />}

            {!isLicenseAvailable && (
                <Notice
                    contentKey="license_not_available_please_upload_license_file"
                    ns="alerts"
                    wrapperClassName="mb-4"
                />
            )}

            <Table
                title="doors"
                data={clients}
                columns={tableColumns}
                rowsPerPage={10}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
