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
import type { T_InputDropdownOption } from "@components/template"
import { Button, Input, Switch, Table } from "@components/template"
import type { T_Customer, T_FetchCustomers } from "@core/api"
import { API } from "@core/api"
import { formatDate, formatPhoneNumber } from "@core/functions"
import { useReportExport } from "@core/hooks"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { CardAdd, Edit2, ExportSquare, Eye, Key } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

const PageSize = 7

export const OwnersList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { handleExport } = useReportExport("customers_list_report")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchCustomers>({ count: 0, items: [] })
    const [selected, setSelected] = useState<T_Customer | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [current, setCurrent] = useState(1)
    const [accessControlOptions, setAccessControlOptions] = useState<T_InputDropdownOption[]>([])

    const [creationDate, setCreationDate] = useState<Date | null>(null)
    const [disabledApb, setDisabledApb] = useState<boolean>(false)
    const [blocked, setBlocked] = useState<boolean>(false)
    const [plateSerial, setPlateSerial] = useState<string>("")
    const [accessControlToken, setAccessControlToken] = useState<string>("")
    const [searchToken, setSearchToken] = useState<string>("")

    const tableColumns: TableColumn<T_Customer>[] = [
        {
            width: "100px",
            name: t("image"),
            cell: (row: T_Customer) =>
                row.image_url ? (
                    <img
                        src={row.image_url}
                        className="w-12 rounded-full"
                        alt={`${row.first_name} ${row.last_name} profile`}
                    />
                ) : (
                    <img
                        src={Images.UserProfilePlaceholder}
                        className="w-12 rounded-full"
                        alt={`${row.first_name} ${row.last_name} profile`}
                    />
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
            width: "150px",
            name: t("creation_date"),
            selector: (row: T_Customer) => formatDate(new Date(row.created_at)),
        },
        {
            width: "100px",
            name: "APB",
            cell: (row: T_Customer) => (
                <Switch checked={row.apb} onSwitchToggle={() => toggleAntiPassBack(row.token)} />
            ),
        },
        {
            width: "100px",
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
            <Button
                variant="primary"
                contentKey="excel_export"
                icon={<ExportSquare size={16} />}
                onClick={() =>
                    handleExport(
                        API.Export.ExportCustomerList({
                            body: {
                                page: 0,
                                limit: 0,
                                ...(creationDate && { creation_date: creationDate.toDateString() }),
                                ...(accessControlToken && { access_control_token: accessControlToken }),
                                ...(searchToken && { search: searchToken }),
                                ...(disabledApb && { apb: !disabledApb }),
                                ...(blocked && { blocked }),
                                ...(plateSerial && { plate_serial: plateSerial }),
                            },
                        })
                    )
                }
            />
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Owner.Add)} />
        </div>
    )

    // Methods
    const fetchOwners = async (page?: number) => {
        const target = page ?? current
        if (page) setCurrent(page)
        const { data } = await API.Customer.FetchCustomers({
            body: {
                page: target,
                limit: PageSize,
                ...(creationDate && { creation_date: creationDate.toDateString() }),
                ...(accessControlToken && { access_control_token: accessControlToken }),
                ...(searchToken && { search: searchToken }),
                ...(disabledApb && { apb: !disabledApb }),
                ...(blocked && { blocked }),
                ...(plateSerial && { plate_serial: plateSerial }),
            },
        })
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

    const fetchAccessControlOptions = async () => {
        const { data } = await API.Client.FetchFlatAccessControls()
        if (data?.fetchAccessControls) {
            setAccessControlOptions(
                data.fetchAccessControls.map(_ => ({ value: _.token, label: `${_.title} (${_.schedule.title})` }))
            )
        }
    }

    // Use effects
    useEffect(() => {
        fetchAccessControlOptions()
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
                <div className="grid grid-cols-12 gap-6">
                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="submission_date" className="min-w-24" />
                        <div className="w-full">
                            <Input.DatePicker
                                disabled={isFetching}
                                value={creationDate}
                                onChange={(e: Date | null) => setCreationDate(e)}
                                clearable
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="access_control" className="min-w-24" />
                        <Input.DropDown
                            options={accessControlOptions}
                            value={accessControlToken}
                            setValue={(_: string) => setAccessControlToken(_ as string)}
                            disabled={isFetching}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="search" className="min-w-24" />
                        <div className="w-full">
                            <Input
                                placeholder="please_search"
                                disabled={isFetching}
                                value={searchToken}
                                onChange={e => setSearchToken(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="plate_number" className="min-w-24" />
                        <Input.PlateNumber
                            setValue={(value: string) => setPlateSerial(value)}
                            value={plateSerial}
                            disabled={isFetching}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Checkbox
                            labelKey="black_list"
                            checked={blocked}
                            onChange={e => setBlocked(e.target.checked)}
                            disabled={isFetching}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Checkbox
                            labelKey="disabled_apb"
                            checked={disabledApb}
                            onChange={e => setDisabledApb(e.target.checked)}
                            disabled={isFetching}
                        />
                    </div>

                    <div className="w-full col-span-10 flex">
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
