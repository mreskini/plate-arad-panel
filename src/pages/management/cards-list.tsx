/* eslint-disable react/no-unstable-nested-components */
import { Status } from "@components/common"
import { Layout } from "@components/layout"
import { AddCardModal, EditCardModal } from "@components/pages/Management"
import { Button, Input, Switch, Table } from "@components/template"
import type { T_Card, T_FetchCards } from "@core/api"
import { E_CardType } from "@core/api/gql/types"
import { sleep } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { Cards, Edit2, Money, SearchNormal1 } from "iconsax-reactjs"
import { range } from "lodash"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const PageSize = 7

export const CardsList = () => {
    // States and hooks
    const { t } = useTranslation("tables")
    const { modalVisibility, openModal } = useModal()
    const [tableData, setTableData] = useState<T_FetchCards>({ count: 0, items: [] })
    const [selectedCard, setSelectedCard] = useState<T_Card | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [searchValue, setSearchValue] = useState("")

    const tableColumns = [
        {
            name: t("card_number"),
            selector: (row: T_Card) => row.card_number,
        },
        {
            name: t("serial"),
            selector: (row: T_Card) => row.serial,
        },
        {
            name: t("type"),
            cell: (row: T_Card) => {
                const isRfid = row.type === E_CardType.RFID
                return (
                    <Status
                        contentKey={isRfid ? "RFID" : "CSN"}
                        variant={isRfid ? "info" : "warning"}
                        icon={isRfid ? <Money size={20} /> : <Cards size={20} />}
                    />
                )
            },
        },
        {
            name: t("activation"),
            cell: (row: T_Card) => <Switch checked={row.is_active} onSwitchToggle={() => {}} />,
        },
        {
            name: t("actions"),
            cell: (row: T_Card) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        <Edit2
                            size={20}
                            className="text-neutral-700"
                            onClick={() => {
                                setSelectedCard(row)
                                openModal(Modals.Management.Card.EditCard)
                            }}
                        />
                    </Button>
                </div>
            ),
        },
    ]

    const tableActions = (
        <div className="flex items-stretch gap-2">
            <Button variant="primary" contentKey="add" onClick={() => openModal(Modals.Management.Card.AddCard)} />
        </div>
    )

    // Methods
    const fetchCardsList = async () => {
        await sleep(2000)

        setTableData({
            count: 10,
            items: range(0, 7).map(_ => ({
                token: `${_}`,
                type: _ % 2 === 0 ? E_CardType.CSN : E_CardType.RFID,
                serial: `TestSerial000${_}`,
                is_active: _ % 2 === 0,
                card_number: `1000${_}`,
            })),
        })

        setIsFetching(false)
    }

    useEffect(() => {
        fetchCardsList()
    }, [])

    useEffect(() => {
        if (isFetching) return () => {}
        const handler = setTimeout(() => fetchCardsList(), 500)
        return () => {
            clearTimeout(handler)
        }
    }, [searchValue])

    // Render
    return (
        <Layout.Dashboard>
            {modalVisibility[Modals.Management.Card.AddCard] && <AddCardModal callback={fetchCardsList} />}

            {modalVisibility[Modals.Management.Card.EditCard] && (
                <EditCardModal callback={fetchCardsList} card={selectedCard!} />
            )}

            <div className="mb-4">
                <Input
                    placeholder="search_by_card_number"
                    icon={<SearchNormal1 />}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>

            <Table
                title="cards_list"
                data={tableData.items}
                columns={tableColumns}
                rowsPerPage={PageSize}
                actions={tableActions}
                loading={isFetching}
                paginationType="Remote"
                totalRows={tableData.count}
                onChangePage={fetchCardsList}
            />
        </Layout.Dashboard>
    )
}
