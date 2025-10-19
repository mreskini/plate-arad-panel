/* eslint-disable react/no-unstable-nested-components */
import { ExportProgressModal } from "@components/common"
import { Layout } from "@components/layout"
import { ReportsFiltersWrapper } from "@components/pages/Reports"
import { Button, Input, Table } from "@components/template"
import type { T_FetchTrafficWithEmergency, T_TrafficWithEmergency } from "@core/api"
import { formatDateTime, formatNumber, sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { ExportSquare } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { range } from "lodash"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const PageSize = 5

export const ReportsTrafficWithEmergencyList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal, closeModal } = useModal()
    const [isFetching, setIsFetching] = useState(true)
    const [tableData, setTableData] = useState<T_FetchTrafficWithEmergency>({ count: 0, items: [] })
    const [plateNumberSerial, setPlateNumberSerial] = useState<string>("")

    const tableColumns: TableColumn<T_TrafficWithEmergency>[] = [
        {
            name: t("camera_name"),
            cell: (row: T_TrafficWithEmergency) => row.camera_name,
        },
        {
            name: t("plate_number"),
            cell: (row: T_TrafficWithEmergency) =>
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
            name: t("traffic_date_and_time"),
            cell: (row: T_TrafficWithEmergency) => formatDateTime(new Date(row.entrance)),
        },
        {
            name: t("traffic_image"),
            cell: (row: T_TrafficWithEmergency) =>
                row.entrance_image && (
                    <Link
                        to={row.entrance_image}
                        target="_blank"
                        className="flex items-center justify-center rounded-full size-8 bg-blue-100"
                    >
                        <img src={Images.UserProfilePlaceholder} alt={`${row.plate_serial} entrance`} />
                    </Link>
                ),
        },
        {
            name: t("direction"),
            cell: (row: T_TrafficWithEmergency) => row.direction,
        },
        {
            name: t("descriptions"),
            cell: (row: T_TrafficWithEmergency) => row.descriptions,
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button
                variant="primary"
                contentKey="excel_export"
                icon={<ExportSquare size={16} />}
                onClick={async () => {
                    openModal(Modals.ExportFile)
                    await sleep(2000)
                    closeModal(Modals.ExportFile)
                }}
            />
        </div>
    )

    // Methods
    const fetchTableData = async () => {
        await sleep(2000)

        const MockTableData: T_FetchTrafficWithEmergency = {
            count: 10,
            items: range(1, 7).map(_ => {
                return {
                    id: _,
                    camera_name: `دوربین ${formatNumber(_)}`,
                    plate_serial: `IR11-546P55`,
                    entrance: new Date(),
                    entrance_image: Images.UserProfilePlaceholder,
                    exit: new Date(),
                    exit_image: Images.UserProfilePlaceholder,
                    direction: "خروجی",
                    descriptions: "عبور خودروهای امدادی در پارکینگ",
                }
            }),
        }

        setTableData(MockTableData)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchTableData()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.ExportFile] && <ExportProgressModal />}

            <ReportsFiltersWrapper>
                <div className="grid grid-cols-5 gap-6">
                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="traffic_date_and_time" className="min-w-24" />
                        <div className="w-full">
                            <Input.DateTimePicker disabled={isFetching} clearable />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="direction" className="min-w-16" />
                        <Input.DropDown options={[]} setValue={() => {}} disabled={isFetching} clearable />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="camera" className="min-w-24" />
                        <Input.DropDown options={[]} setValue={() => {}} disabled={isFetching} clearable />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="plate_number" className="min-w-24" />
                        <div className="flex items-center gap-2">
                            <Input.PlateNumber
                                setValue={(value: string) => setPlateNumberSerial(value)}
                                value={plateNumberSerial}
                                disabled={isFetching}
                                clearable
                            />
                        </div>
                    </div>

                    <div className="w-full col-span-1 flex justify-end">
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
                title="traffic"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
