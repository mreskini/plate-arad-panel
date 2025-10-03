/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import {
    AddOwnerModal,
    AddOwnerVehicleModal,
    EditOwnerModal,
    ManagementFiltersWrapper,
} from "@components/pages/Management"
import { ViewOwnerVehiclesModal } from "@components/pages/Management/Owner/ViewOwnerVehiclesModal"
import { Button, Input, Table } from "@components/template"
import type { T_FetchOwners, T_Owner } from "@core/api"
import { formatDate, formatNumber, sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Car, Edit2, Eye } from "iconsax-reactjs"
import { range } from "lodash"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"

const PageSize = 7

export const OwnersList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchOwners>({ count: 0, items: [] })
    const [selected, setSelected] = useState<T_Owner | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    const tableColumns: TableColumn<T_Owner>[] = [
        {
            name: t("firstname"),
            selector: (row: T_Owner) => row.firstname,
        },
        {
            name: t("lastname"),
            selector: (row: T_Owner) => row.lastname,
        },
        {
            name: t("date"),
            selector: (row: T_Owner) => formatDate(new Date(row.created_at)),
        },
        {
            name: t("descriptions"),
            selector: (row: T_Owner) => row.descriptions,
        },
        {
            width: "120px",
            name: t("actions"),
            cell: (row: T_Owner) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Eye
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Management.Owner.ViewVehicles)
                            }}
                        />
                    </Button>

                    <Button variant="ghost">
                        <Car
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Management.Owner.AddVehicle)
                            }}
                        />
                    </Button>

                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Management.Owner.EditOwner)
                            }}
                        />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Management.Owner.AddOwner)} />
        </div>
    )

    // Methods
    const fetchOwners = async () => {
        await sleep(2000)

        const MockTableData: T_FetchOwners = {
            count: 10,
            items: range(1, 7).map(_ => {
                return {
                    firstname: "عباس",
                    lastname: "اکبری",
                    national_code: `${formatNumber(971234560)}${formatNumber(_)}`,
                    phone_number: `${formatNumber(912100100)}${formatNumber(_)}`,
                    descriptions: `توضیحات مالک شماره ${formatNumber(_)}`,
                    created_at: new Date(),
                    vehicles: range(1, 4).map(v => ({
                        plate_number: "IR15-546b55",
                        vehicle_model: `مدل خودرو ${formatNumber(v)}`,
                        vehicle_color: `رنگ خودرو ${formatNumber(v)}`,
                        vehicle_year: `${1400 + v}`,
                    })),
                }
            }),
        }

        setTableData(MockTableData)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchOwners()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Management.Owner.AddOwner] && <AddOwnerModal callback={fetchOwners} />}

            {modalVisibility[Modals.Management.Owner.EditOwner] && (
                <EditOwnerModal callback={fetchOwners} owner={selected!} />
            )}

            {modalVisibility[Modals.Management.Owner.AddVehicle] && <AddOwnerVehicleModal callback={fetchOwners} />}
            {modalVisibility[Modals.Management.Owner.ViewVehicles] && <ViewOwnerVehiclesModal owner={selected!} />}

            <ManagementFiltersWrapper>
                <div className="grid grid-cols-4 gap-6">
                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="submission_date" className="min-w-32" />
                        <div className="w-full">
                            <Input.DateTimePicker disabled={isFetching} clearable />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="owner_firstname" className="min-w-32" />
                        <div className="w-full">
                            <Input placeholder="owner_firstname_here" disabled={isFetching} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="owner_lastname" className="min-w-32" />
                        <div className="w-full">
                            <Input placeholder="owner_lastname_here" disabled={isFetching} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="plate_number" className="min-w-32" />
                        <div className="flex items-center gap-2">
                            <Input.PlateNumber disabled={isFetching} clearable />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="vehicle_model" className="min-w-32" />
                        <div className="w-full">
                            <Input placeholder="vehicle_model_here" disabled={isFetching} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="vehicle_color" className="min-w-32" />
                        <div className="w-full">
                            <Input placeholder="vehicle_color_here" disabled={isFetching} />
                        </div>
                    </div>

                    <div className="flex items-center col-span-1">
                        <div className="w-full col-span-1 flex">
                            <Button
                                contentKey="apply"
                                loading={isFetching}
                                disabled={isFetching}
                                onClick={() => {
                                    setIsFetching(true)
                                    fetchOwners()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </ManagementFiltersWrapper>

            <Table
                title="owners_management"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
                totalRows={tableData.count}
                paginationType="Remote"
                onChangePage={fetchOwners}
            />
        </Layout.Dashboard>
    )
}
