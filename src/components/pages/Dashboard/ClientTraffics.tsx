/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
import { useSubscription } from "@apollo/client/react"
import { Status } from "@components/common"
import { ClientTypeKeyMap } from "@components/pages/Access"
import { Button, Table, Text } from "@components/template"
import type { T_Client, T_LastTraffic, T_LastTrafficsSub } from "@core/api"
import { API, CLIENT_LAST_TRAFFICS_SUB } from "@core/api"
import { formatDateTime } from "@core/functions"
import clsx from "clsx"
import { More } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"
import { useEffect, useState } from "react"
import type { TableColumn } from "react-data-table-component"
import { useTranslation } from "react-i18next"

interface I_Props {
    client: T_Client
    selected: T_LastTraffic | null
    setSelected: Function
}

export const ClientTraffics: FC<I_Props> = ({ client, selected, setSelected }) => {
    // States and hooks
    const { t } = useTranslation("tables")
    const [isFetching, setIsFetching] = useState(true)
    const [recentTraffics, setRecentTraffics] = useState<T_LastTraffic[]>([])

    const tableColumns: TableColumn<T_LastTraffic>[] = [
        {
            name: t("traffic_date_and_time"),
            cell: (row: T_LastTraffic) => formatDateTime(new Date(row.created_at)),
            width: "140px",
        },
        {
            name: t("client_type"),
            cell: (row: T_LastTraffic) =>
                row.client ? <Text contentKey={ClientTypeKeyMap[row.client.type]} variant="meta-2" /> : "",
            width: "80px",
        },
        {
            name: t("customer_name"),
            cell: (row: T_LastTraffic) =>
                row.customer ? `${row.customer.first_name} ${row.customer.last_name} - ${row.customer.id}` : "",
            width: "160px",
        },
        {
            name: t("authorized"),
            cell: (row: T_LastTraffic) => (
                <Status contentKey={row.authorized ? "yes" : "no"} variant={row.authorized ? "success" : "error"} />
            ),
            width: "70px",
        },
        {
            name: t("plate_number"),
            cell: (row: T_LastTraffic) =>
                row.plate_serial ? (
                    <div className="max-w-[175px]">
                        <IranLicensePlate serial={row.plate_serial} />
                    </div>
                ) : (
                    ""
                ),
        },
        {
            name: "",
            width: "80px",
            cell: (row: T_LastTraffic) => (
                <Button variant="ghost" onClick={() => setSelected(row)}>
                    <More
                        className={clsx([selected && selected.token === row.token ? "text-blue-500" : "text-zinc-800"])}
                    />
                </Button>
            ),
        },
    ]

    const { data } = useSubscription<T_LastTrafficsSub>(CLIENT_LAST_TRAFFICS_SUB, {
        onError: error => console.error("Subscription error:", error),
        variables: { token: client.token },
    })

    // Methods
    const init = async () => {
        const { data: d } = await API.Traffic.FetchClientLast10Traffics({ body: { client_token: client.token } })
        if (d) setRecentTraffics(d.fetchClientLast10Traffics)
        setIsFetching(false)
    }

    // Use Effects
    useEffect(() => {
        if (data && data.clientLast10TrafficsSub) setRecentTraffics(data.clientLast10TrafficsSub)
    }, [data])

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (recentTraffics.length > 0) setSelected(recentTraffics[0])
    }, [recentTraffics])

    // Render
    return (
        <Table
            data={recentTraffics}
            columns={tableColumns}
            rowsPerPage={8}
            loading={isFetching}
            className="rounded-t-none"
        />
    )
}
