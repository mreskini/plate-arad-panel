/* eslint-disable react/no-unstable-nested-components */
import { ExportProgressModal, Status } from "@components/common"
import { Layout } from "@components/layout"
import { ClientTypeKeyMap, ClientTypeOptions } from "@components/pages/Access"
import { ReportsFiltersWrapper } from "@components/pages/Reports"
import type { T_InputDropdownOption } from "@components/template"
import { Button, Input, Table, Text } from "@components/template"
import type { E_ClientType, T_Client, T_FetchTrafficReport, T_TrafficReport } from "@core/api"
import { API } from "@core/api"
import { useCommon } from "@core/contexts"
import { formatDateTime } from "@core/functions"
import { useReportExport } from "@core/hooks"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { ExportSquare } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const PageSize = 5

export const ReportsTrafficList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { handleExport } = useReportExport("traffic_list_report")
    const { modalVisibility } = useModal()
    const { onCustomerSearch, onUserSearch, onCardIdentifierSearch, onTagIdentifierSearch, fetchFlatClients } =
        useCommon()
    const [isFetching, setIsFetching] = useState(true)
    const [tableData, setTableData] = useState<T_FetchTrafficReport>({ count: 0, items: [] })
    const [current, setCurrent] = useState(1)
    const [initialUsers, setInitialUsers] = useState<T_InputDropdownOption[]>([])
    const [initialCustomers, setInitialCustomers] = useState<T_InputDropdownOption[]>([])
    const [clientOptions, setClientOptions] = useState<T_InputDropdownOption[]>([])
    const [initialCardIdentifiers, setInitialCardIdentifiers] = useState<T_InputDropdownOption[]>([])
    const [initialTagIdentifiers, setInitialTagIdentifiers] = useState<T_InputDropdownOption[]>([])

    const [startDateAndTime, setStartDateAndTime] = useState<Date | null>(null)
    const [endDateAndTime, setEndDateAndTime] = useState<Date | null>(null)
    const [clientType, setClientType] = useState<E_ClientType>()
    const [userToken, setUserToken] = useState<string>()
    const [customerToken, setCustomerToken] = useState<string>()
    const [clientToken, setClientToken] = useState<string>()
    const [tagSerial, setTagSerial] = useState<string>()
    const [cardSerial, setCardSerial] = useState<string>()
    const [hasDriverImage, setHasDriverImage] = useState<boolean>(false)
    const [hasPlateImage, setHasPlateImage] = useState<boolean>(false)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [plateSerial, setPlateSerial] = useState<string>()

    const tableColumns: TableColumn<T_TrafficReport>[] = [
        {
            name: t("date"),
            cell: (row: T_TrafficReport) => formatDateTime(new Date(row.created_at)),
            width: "150px",
        },
        {
            name: t("client_type"),
            cell: (row: T_TrafficReport) =>
                row.type ? <Text contentKey={ClientTypeKeyMap[row.type]} variant="meta-2" /> : "",
            width: "100px",
        },
        {
            name: t("user_name"),
            cell: (row: T_TrafficReport) => (row.user_name ? row.user_name : ""),
        },
        {
            name: t("customer_name"),
            cell: (row: T_TrafficReport) => (row.customer_name ? row.customer_name : ""),
        },
        {
            name: t("client_name"),
            cell: (row: T_TrafficReport) => (row.client_name ? row.client_name : ""),
        },
        {
            name: t("card_identifier"),
            cell: (row: T_TrafficReport) => (row.card_serial ? row.card_serial : ""),
        },
        {
            name: t("tag_identifier"),
            cell: (row: T_TrafficReport) => (row.tag_serial ? row.tag_serial : ""),
        },
        {
            name: t("plate_image"),
            cell: (row: T_TrafficReport) =>
                row.plate_image ? (
                    <Link to={row.plate_image} target="_blank">
                        <img src={Images.UserProfilePlaceholder} alt={`${row.customer_name} plate`} />
                    </Link>
                ) : (
                    ""
                ),
        },
        {
            name: t("authorized"),
            cell: (row: T_TrafficReport) => (
                <Status contentKey={row.authorized ? "yes" : "no"} variant={row.authorized ? "success" : "error"} />
            ),
            width: "80px",
        },
        {
            name: t("plate_number"),
            cell: (row: T_TrafficReport) =>
                row.plate_serial ? (
                    <div className="max-w-[175px]">
                        <IranLicensePlate serial={row.plate_serial} />
                    </div>
                ) : (
                    ""
                ),
            minWidth: "250px",
        },
        {
            minWidth: "200px",
            name: t("descriptions"),
            selector: (row: T_TrafficReport) => (row.description ? row.description : ""),
            wrap: true,
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
                        API.Export.ExportReportTrafficList({
                            body: {
                                page: current,
                                limit: PageSize,
                                ...(startDateAndTime && { start: startDateAndTime.toString() }),
                                ...(endDateAndTime && { end: endDateAndTime.toString() }),
                                ...(clientType && { type: clientType }),
                                ...(userToken && { user_token: userToken }),
                                ...(customerToken && { customer_token: customerToken }),
                                ...(clientToken && { client_token: clientToken }),
                                ...(cardSerial && { card_serial: cardSerial }),
                                ...(tagSerial && { tag_serial: tagSerial }),
                                ...(hasDriverImage && { has_driver_image: hasDriverImage }),
                                ...(hasPlateImage && { has_plate_image: hasDriverImage }),
                                ...(isAuthorized && { authorized: isAuthorized }),
                                ...(plateSerial && { plate_serial: plateSerial }),
                            },
                        })
                    )
                }
            />
        </div>
    )

    const fetchTableData = async (page?: number) => {
        const target = page ?? current
        if (page) setCurrent(page)

        const { data } = await API.Report.ReportTrafficList({
            body: {
                page: target,
                limit: PageSize,
                ...(startDateAndTime && { start: startDateAndTime.toString() }),
                ...(endDateAndTime && { end: endDateAndTime.toString() }),
                ...(clientType && { type: clientType }),
                ...(userToken && { user_token: userToken }),
                ...(customerToken && { customer_token: customerToken }),
                ...(clientToken && { client_token: clientToken }),
                ...(cardSerial && { card_serial: cardSerial }),
                ...(tagSerial && { tag_serial: tagSerial }),
                ...(hasDriverImage && { has_driver_image: hasDriverImage }),
                ...(hasPlateImage && { has_plate_image: hasDriverImage }),
                ...(isAuthorized && { authorized: isAuthorized }),
                ...(plateSerial && plateSerial !== "IR-" && { plate_serial: plateSerial }),
            },
        })

        if (data) setTableData(data.reportTrafficList)
        setIsFetching(false)
    }

    const fetchClientOptions = async () => {
        const clients = await fetchFlatClients()

        const options = clients.map((client: T_Client) => ({
            label: client.name,
            value: client.token,
        }))

        setClientOptions(options)
    }

    // Use effects
    useEffect(() => {
        fetchClientOptions()
        fetchTableData()
        onUserSearch("").then(_ => setInitialUsers(_))
        onCustomerSearch("").then(_ => setInitialCustomers(_))
        onCardIdentifierSearch("").then(_ => setInitialCardIdentifiers(_))
        onTagIdentifierSearch("").then(_ => setInitialTagIdentifiers(_))
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.ExportFile] && <ExportProgressModal />}

            <ReportsFiltersWrapper>
                <div className="grid grid-cols-12 gap-6">
                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="start_date_and_time" className="min-w-20" />
                        <div className="w-full">
                            <Input.DateTimePicker
                                disabled={isFetching}
                                value={startDateAndTime}
                                onChange={(e: Date | null) => setStartDateAndTime(e)}
                                clearable
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="end_date_and_time" className="min-w-20" />
                        <div className="w-full">
                            <Input.DateTimePicker
                                disabled={isFetching}
                                value={endDateAndTime}
                                onChange={(e: Date | null) => setEndDateAndTime(e)}
                                clearable
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="door_type" className="min-w-20" />
                        <Input.DropDown
                            options={ClientTypeOptions}
                            value={clientType}
                            setValue={(value: E_ClientType) => setClientType(value)}
                            disabled={isFetching}
                            placeholder="please_select"
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="user_name" className="min-w-20" />
                        <Input.DropDown
                            options={initialUsers}
                            value={userToken}
                            setValue={(_: string) => setUserToken(_)}
                            disabled={isFetching}
                            placeholder="please_search"
                            onSearch={onUserSearch}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="customer_name" className="min-w-20" />
                        <Input.DropDown
                            options={initialCustomers}
                            value={customerToken}
                            setValue={(_: string) => setCustomerToken(_)}
                            disabled={isFetching}
                            placeholder="please_search"
                            onSearch={onCustomerSearch}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="door_name" className="min-w-20" />
                        <Input.DropDown
                            options={clientOptions}
                            value={clientToken}
                            setValue={(_: string) => setClientToken(_)}
                            disabled={isFetching}
                            placeholder="please_select"
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="card_identifier" className="min-w-20" />
                        <Input.DropDown
                            options={initialCardIdentifiers}
                            value={cardSerial}
                            setValue={(_: string) => setCardSerial(_)}
                            disabled={isFetching}
                            placeholder="please_search"
                            onSearch={onCardIdentifierSearch}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="tag_identifier" className="min-w-20" />
                        <Input.DropDown
                            options={initialTagIdentifiers}
                            value={tagSerial}
                            setValue={(_: string) => setTagSerial(_)}
                            disabled={isFetching}
                            placeholder="please_search"
                            onSearch={onTagIdentifierSearch}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-3">
                        <Input.Label labelKey="plate_number" className="min-w-20" />
                        <Input.PlateNumber
                            setValue={(value: string) => setPlateSerial(value)}
                            value={plateSerial}
                            disabled={isFetching}
                            clearable
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-2">
                        <Input.Checkbox
                            labelKey="has_driver_image"
                            checked={hasDriverImage}
                            onChange={e => setHasDriverImage(e.target.checked)}
                            disabled={isFetching}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-2">
                        <Input.Checkbox
                            labelKey="has_plate_image"
                            checked={hasPlateImage}
                            onChange={e => setHasPlateImage(e.target.checked)}
                            disabled={isFetching}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-2">
                        <Input.Checkbox
                            labelKey="is_authorized"
                            checked={isAuthorized}
                            onChange={e => setIsAuthorized(e.target.checked)}
                            disabled={isFetching}
                        />
                    </div>

                    <div className="flex items-center justify-end w-full col-span-3">
                        <Button
                            contentKey="apply"
                            loading={isFetching}
                            disabled={isFetching}
                            onClick={() => {
                                setIsFetching(true)
                                fetchTableData()
                            }}
                        />
                    </div>
                </div>
            </ReportsFiltersWrapper>

            <Table
                title="traffic_report"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
                paginationType="Remote"
                totalRows={tableData.count}
                onChangePage={fetchTableData}
            />
        </Layout.Dashboard>
    )
}
