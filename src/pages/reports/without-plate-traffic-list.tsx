/* eslint-disable react/no-unstable-nested-components */
import { ExportProgressModal } from "@components/common"
import { Layout } from "@components/layout"
import { type I_OwnerFieldFilter, OwnerFieldFilter, ReportsFiltersWrapper } from "@components/pages/Reports"
import { Button, Input, Table } from "@components/template"
import type { T_FetchWithoutPlateTraffic, T_WithoutPlateTraffic } from "@core/api"
import { formatDateTime, formatNumber, sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { ExportSquare } from "iconsax-reactjs"
import { range } from "lodash"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const PageSize = 5

export const ReportsWithoutPlateTrafficList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal, closeModal } = useModal()
    const [isFetching, setIsFetching] = useState(true)
    const [tableData, setTableData] = useState<T_FetchWithoutPlateTraffic>({ count: 0, items: [] })
    const [ownerToken, setOwnerToken] = useState<string>("")

    const OwnerFieldFilterProps: I_OwnerFieldFilter = { ownerToken, setOwnerToken, isFetching }

    const tableColumns: TableColumn<T_WithoutPlateTraffic>[] = [
        {
            name: t("camera_name"),
            cell: (row: T_WithoutPlateTraffic) => row.camera_name,
        },
        {
            name: t("owner_name"),
            cell: (row: T_WithoutPlateTraffic) => row.owner_name,
        },
        {
            name: t("traffic_date_and_time"),
            cell: (row: T_WithoutPlateTraffic) => formatDateTime(new Date(row.entrance)),
        },
        {
            name: t("traffic_image"),
            cell: (row: T_WithoutPlateTraffic) =>
                row.entrance_image && (
                    <Link
                        to={row.entrance_image}
                        target="_blank"
                        className="flex items-center justify-center rounded-full size-8 bg-blue-100"
                    >
                        <img src={Images.UserProfilePlaceholder} alt={`${row.owner_name} entrance`} />
                    </Link>
                ),
        },
        {
            name: t("direction"),
            cell: (row: T_WithoutPlateTraffic) => row.direction,
        },
        {
            name: t("permission"),
            cell: (row: T_WithoutPlateTraffic) => row.permission,
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

        const MockTableData: T_FetchWithoutPlateTraffic = {
            count: 10,
            items: range(1, 7).map(_ => {
                return {
                    id: _,
                    camera_name: `دوربین ${formatNumber(_)}`,
                    owner_name: `مالک ${formatNumber(_)}`,
                    entrance: new Date(),
                    entrance_image: Images.UserProfilePlaceholder,
                    exit: new Date(),
                    exit_image: Images.UserProfilePlaceholder,
                    direction: "خروجی",
                    permission: "همه",
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
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="traffic_date_and_time" className="min-w-24" />
                        <div className="w-full">
                            <Input.DateTimePicker disabled={isFetching} clearable />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="owner" className="min-w-24" />
                        <OwnerFieldFilter {...OwnerFieldFilterProps} />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="permission" className="min-w-24" />
                        <Input.DropDown options={[]} setValue={() => {}} disabled={isFetching} clearable />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="direction" className="min-w-24" />
                        <Input.DropDown options={[]} setValue={() => {}} disabled={isFetching} clearable />
                    </div>

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="camera" className="min-w-24" />
                        <Input.DropDown options={[]} setValue={() => {}} disabled={isFetching} clearable />
                    </div>

                    <div className="flex items-center w-full col-span-1">
                        <div className="w-full col-span-1 flex">
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
                </div>
            </ReportsFiltersWrapper>

            <Table
                title="traffic_without_plate"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
            />
        </Layout.Dashboard>
    )
}
