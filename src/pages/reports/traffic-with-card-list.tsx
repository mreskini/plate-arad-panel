/* eslint-disable react/no-unstable-nested-components */
import { ExportProgressModal, Status } from "@components/common"
import { Layout } from "@components/layout"
import { type I_OwnerFieldFilter, OwnerFieldFilter, ReportsFiltersWrapper } from "@components/pages/Reports"
import { Button, Input, Table } from "@components/template"
import { E_OwnerCardType, type T_FetchTrafficWithCard, type T_TrafficWithCard } from "@core/api"
import { formatDateTime, formatNumber, sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import { Cards, ExportSquare, Money } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { range } from "lodash"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const PageSize = 5

export const ReportsTrafficWithCardList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal, closeModal } = useModal()
    const [isFetching, setIsFetching] = useState(true)
    const [tableData, setTableData] = useState<T_FetchTrafficWithCard>({ count: 0, items: [] })
    const [ownerToken, setOwnerToken] = useState<string>("")
    const [plateNumberSerial, setPlateNumberSerial] = useState<string>("")

    const OwnerFieldFilterProps: I_OwnerFieldFilter = { ownerToken, setOwnerToken, isFetching }

    const tableColumns: TableColumn<T_TrafficWithCard>[] = [
        {
            name: t("camera_name"),
            cell: (row: T_TrafficWithCard) => row.camera_name,
        },
        {
            name: t("plate_number"),
            cell: (row: T_TrafficWithCard) =>
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
            name: t("owner_name"),
            cell: (row: T_TrafficWithCard) => row.owner_name,
        },
        {
            name: t("traffic_date_and_time"),
            cell: (row: T_TrafficWithCard) => formatDateTime(new Date(row.entrance)),
        },
        {
            name: t("traffic_image"),
            cell: (row: T_TrafficWithCard) =>
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
            cell: (row: T_TrafficWithCard) => row.direction,
        },
        {
            name: t("permission"),
            cell: (row: T_TrafficWithCard) => row.permission,
        },
        {
            name: t("card_number"),
            selector: (row: T_TrafficWithCard) => row.card.card_number,
        },
        {
            name: t("card_type"),
            cell: (row: T_TrafficWithCard) => {
                const isCard = row.card.type === E_OwnerCardType.Card
                return (
                    <Status
                        contentKey={isCard ? "card" : "tag"}
                        variant={isCard ? "info" : "warning"}
                        icon={isCard ? <Money size={20} /> : <Cards size={20} />}
                    />
                )
            },
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

        const MockTableData: T_FetchTrafficWithCard = {
            count: 10,
            items: range(1, 7).map(_ => {
                return {
                    id: _,
                    camera_name: `دوربین ${formatNumber(_)}`,
                    plate_serial: `IR15-546b55`,
                    owner_name: `مراجع ${formatNumber(_)}`,
                    entrance: new Date(),
                    entrance_image: Images.UserProfilePlaceholder,
                    exit: new Date(),
                    exit_image: Images.UserProfilePlaceholder,
                    direction: "خروجی",
                    permission: "همه",
                    card: {
                        card_number: `123456789${_}`,
                        type: _ % 2 === 0 ? E_OwnerCardType.Card : E_OwnerCardType.Tag,
                        token: `card-token-${_}`,
                    },
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
                <div className="grid grid-cols-4 gap-6">
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

                    <div className="flex items-center gap-2 w-full col-span-1">
                        <Input.Label labelKey="card_number" className="min-w-24" />
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
