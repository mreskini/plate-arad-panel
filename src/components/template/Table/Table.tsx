/* eslint-disable @typescript-eslint/naming-convention */
import { Images } from "@core/utilities"
import type { KeysWithoutReturnObjects } from "i18next"
import type { ReactNode } from "react"
import type { TableColumn, TableProps } from "react-data-table-component"
import DataTable, { Direction } from "react-data-table-component"
import type { PaginationChangePage } from "react-data-table-component/dist/DataTable/types"

import { Spinner } from "../Spinner"
import { Text } from "../Text"

type T_PaginationType = "Basic" | "Remote"

interface I_Table<T> extends TableProps<T> {
    title?: KeysWithoutReturnObjects["common"]
    data: T[]
    columns: TableColumn<T>[]
    actions?: ReactNode
    loading?: boolean
    rowsPerPage?: number
    pagination?: boolean
    paginationType?: T_PaginationType
    totalRows?: number
    onChangePage?: PaginationChangePage
}

export const Table = <T,>({
    title,
    data,
    columns,
    actions,
    loading = false,
    pagination = true,
    paginationType = "Basic",
    rowsPerPage = 7,
    totalRows,
    onChangePage,
}: I_Table<T>) => {
    // Render
    return (
        <div className="flex flex-col border border-solid border-neutral-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                {title && (
                    <div>
                        <Text contentKey={title} variant="title-1" className="text-blue-500" weight={600} />
                    </div>
                )}

                <div>{actions}</div>
            </div>

            <DataTable
                columns={columns}
                data={data}
                striped
                pagination={pagination}
                paginationPerPage={rowsPerPage}
                {...(paginationType === "Remote" && {
                    paginationServer: true,
                    paginationTotalRows: totalRows,
                    onChangePage,
                })}
                direction={Direction.RTL}
                highlightOnHover
                progressPending={loading}
                progressComponent={
                    <div
                        className="text-neutral-300 w-full flex items-center justify-center rounded-md"
                        style={{ minHeight: rowsPerPage * 60 }}
                    >
                        <div className="flex flex-col items-center gap-4 animate-pulse">
                            <Spinner />
                            <Text contentKey="loading" variant="meta-1" className="text-table-head-text" />
                        </div>
                    </div>
                }
                paginationComponentOptions={{
                    noRowsPerPage: true,
                    rangeSeparatorText: "/",
                }}
                className="overflow-x-auto"
                noDataComponent={
                    <div className="flex flex-col items-center gap-4">
                        <img src={Images.NoData} alt="No data" className="w-2/3 mx-auto" />
                        <Text contentKey="no_data" variant="meta-1" className="text-table-head-text" />
                    </div>
                }
                customStyles={{
                    pagination: {
                        style: {
                            border: "none !important",
                        },
                    },
                    headRow: {
                        style: {
                            backgroundColor: "var(--color-table-head-bg)",
                            color: "var(--color-table-head-text)",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            borderRadius: "6px",
                            fontWeight: "500",
                            fontSize: "14px",
                            marginBottom: "4px",
                            border: "none !important",
                        },
                    },
                    rows: {
                        style: {
                            backgroundColor: "var(--color-table-row-bg)",
                            color: "var(--color-table-row-text)",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            borderRadius: "6px",
                            marginBottom: "4px",
                            border: "none !important",
                        },
                        stripedStyle: {
                            backgroundColor: "var(--color-table-row-striped-bg)",
                            color: "var(--color-table-row-striped-text)",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            borderRadius: "6px",
                            marginBottom: "4px",
                            border: "none !important",
                        },
                    },
                }}
            />
        </div>
    )
}
