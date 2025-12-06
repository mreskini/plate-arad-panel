/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import { Layout } from "@components/layout"
import {
    AddOwnerAccessModal,
    AddOwnerIdentifierModal,
    AddOwnerModal,
    EditOwnerModal,
    ManagementFiltersWrapper,
    ViewOwnerModal,
} from "@components/pages/Management"
import { Button, Input, Switch, Table } from "@components/template"
import type { T_Customer, T_FetchCustomers } from "@core/api"
import { API } from "@core/api"
import { formatDate, formatPhoneNumber } from "@core/functions"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { CardAdd, Edit2, Eye, Key } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const PageSize = 7

export const OwnersList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchCustomers>({ count: 0, items: [] })
    const [selected, setSelected] = useState<T_Customer | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [current, setCurrent] = useState(1)

    const tableColumns: TableColumn<T_Customer>[] = [
        {
            name: t("image"),
            cell: (row: T_Customer) =>
                row.image_url ? (
                    <Link to={row.image_url} target="_blank">
                        <img src={Images.UserProfilePlaceholder} alt={`${row.first_name} ${row.last_name} profile`} />
                    </Link>
                ) : (
                    ""
                ),
        },
        {
            name: t("firstname"),
            selector: (row: T_Customer) => row.first_name,
        },
        {
            name: t("lastname"),
            selector: (row: T_Customer) => row.last_name,
        },
        {
            name: t("phone_number"),
            selector: (row: T_Customer) => formatPhoneNumber(row.mobile),
        },
        {
            name: t("creation_date"),
            selector: (row: T_Customer) => formatDate(new Date(row.created_at)),
        },
        {
            name: "APB",
            cell: (row: T_Customer) => (
                <Switch checked={row.apb} onSwitchToggle={() => toggleAntiPassBack(row.token)} />
            ),
        },
        {
            name: t("black_list"),
            cell: (row: T_Customer) => <Switch checked={row.blocked} onSwitchToggle={() => toggleBlocked(row.token)} />,
        },
        {
            name: t("access_level"),
            selector: (row: T_Customer) => row.access?.title || "",
        },
        {
            name: t("descriptions"),
            selector: (row: T_Customer) => (row.description ? row.description : ""),
        },
        {
            width: "150px",
            name: t("actions"),
            cell: (row: T_Customer) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Eye
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Owner.View)
                            }}
                        />
                    </Button>

                    <Button variant="ghost">
                        <Key
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Owner.AddAccess)
                            }}
                        />
                    </Button>

                    <Button variant="ghost">
                        <CardAdd
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Owner.AddIdentifier)
                            }}
                        />
                    </Button>

                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelected(row)
                                openModal(Modals.Owner.Edit)
                            }}
                        />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Owner.Add)} />
        </div>
    )

    // Methods
    const fetchOwners = async (page?: number) => {
        const target = page ?? current
        if (page) setCurrent(page)
        const { data } = await API.Customer.FetchCustomers({ body: { page: target, limit: PageSize } })
        if (data) setTableData(data.fetchCustomers)
        setIsFetching(false)
    }

    const toggleAntiPassBack = async (token: string) => {
        const { data, error } = await API.Customer.ToggleCustomerApb({ body: { token } })
        if (data) await fetchOwners(current)
        if (error) toast.error(error)
    }

    const toggleBlocked = async (token: string) => {
        const { data, error } = await API.Customer.ToggleCustomerBlocked({ body: { token } })
        if (data) await fetchOwners(current)
        if (error) toast.error(error)
    }

    // Use effects
    useEffect(() => {
        fetchOwners()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Owner.Add] && <AddOwnerModal callback={fetchOwners} />}
            {modalVisibility[Modals.Owner.Edit] && <EditOwnerModal callback={fetchOwners} owner={selected!} />}
            {modalVisibility[Modals.Owner.View] && <ViewOwnerModal owner={selected!} />}

            {modalVisibility[Modals.Owner.AddIdentifier] && (
                <AddOwnerIdentifierModal callback={fetchOwners} owner={selected!} />
            )}

            {modalVisibility[Modals.Owner.AddAccess] && (
                <AddOwnerAccessModal callback={fetchOwners} owner={selected!} />
            )}

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
