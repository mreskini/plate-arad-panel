/* eslint-disable react/no-unstable-nested-components */
import { Status } from "@components/common"
import { Layout } from "@components/layout"
import { AddIdentifierModal, EditIdentifierModal } from "@components/pages/Management"
import { Button, Input, Switch, Table } from "@components/template"
import type { T_FetchIdentifiers, T_Identifier } from "@core/api"
import { API, E_IdentifierType } from "@core/api"
import { useReportExport } from "@core/hooks"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Cards, Edit2, ExportSquare, Money, SearchNormal1 } from "iconsax-reactjs"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

const PageSize = 7

export const IdentifiersList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { handleExport } = useReportExport("identifier_list_report")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchIdentifiers>({ count: 0, items: [] })
    const [selectedIdentifier, setSelectedIdentifier] = useState<T_Identifier | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [current, setCurrent] = useState(1)

    const tableColumns: TableColumn<T_Identifier>[] = [
        {
            name: t("number"),
            selector: (row: T_Identifier) => row.number,
        },
        {
            name: t("serial"),
            selector: (row: T_Identifier) => row.serial,
        },
        {
            name: t("status"),
            cell: (row: T_Identifier) =>
                row.available ? (
                    <div className="bg-green-100 text-green-500 px-2 py-1 rounded-md">{t("active")}</div>
                ) : (
                    <div className="bg-red-100 text-red-400 px-2 py-1 rounded-md">{t("inactive")}</div>
                ),
        },
        {
            name: t("type"),
            cell: (row: T_Identifier) => {
                const isCard = row.type === E_IdentifierType.Card

                return (
                    <Status
                        contentKey={isCard ? "card" : "tag"}
                        variant={isCard ? "info" : "warning"}
                        icon={isCard ? <Money size={20} /> : <Cards size={20} />}
                    />
                )
            },
        },
        {
            name: t("activation"),
            cell: (row: T_Identifier) => (
                <Switch checked={row.available} onSwitchToggle={() => toggleIdentifierAvailability(row.token)} />
            ),
        },
        {
            name: t("actions"),
            cell: (row: T_Identifier) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelectedIdentifier(row)
                                openModal(Modals.Management.Identifier.Edit)
                            }}
                        />
                    </Button>
                </div>
            ),
            maxWidth: "120px",
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
                        API.Export.ExportIdentifierList({
                            body: {
                                page: 0,
                                limit: 0,
                                ...(searchValue && { search: searchValue }),
                            },
                        })
                    )
                }
            />
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Management.Identifier.Add)} />
        </div>
    )

    // Methods
    const fetchIdentifiers = async (page?: number) => {
        const target = page ?? current
        if (page) setCurrent(page)

        const { data } = await API.Identifier.FetchIdentifiers({
            body: {
                page: target,
                limit: PageSize,
                ...(searchValue && { search: searchValue }),
            },
        })

        if (data) setTableData(data.fetchIdentifiers)

        setIsFetching(false)
    }

    const toggleIdentifierAvailability = async (token: string) => {
        const { data, error } = await API.Identifier.ToggleIdentifierStatus({ body: { token } })
        if (data) await fetchIdentifiers(current)
        if (error) toast.error(error)
    }

    // Use effects
    useEffect(() => {
        fetchIdentifiers()
    }, [])

    useEffect(() => {
        if (isFetching) return () => {}

        const handler = setTimeout(() => fetchIdentifiers(), 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchValue])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Management.Identifier.Add] && <AddIdentifierModal callback={fetchIdentifiers} />}

            {modalVisibility[Modals.Management.Identifier.Edit] && (
                <EditIdentifierModal callback={fetchIdentifiers} identifier={selectedIdentifier!} />
            )}

            <div className="mb-4">
                <Input
                    placeholder="search_by_identifier_number"
                    icon={<SearchNormal1 />}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>

            <Table
                title="identifiers_list"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
                paginationType="Remote"
                totalRows={tableData.count}
                onChangePage={fetchIdentifiers}
            />
        </Layout.Dashboard>
    )
}
