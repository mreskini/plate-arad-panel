import type { KeysWithoutReturnObjects } from "i18next"
import type { FC, ReactElement } from "react"
import { ResponsiveContainer } from "recharts"

import { Text } from "../Text"

interface I_Props {
    title: KeysWithoutReturnObjects["common"]
    children: ReactElement
}

export const DashboardChartWrapper: FC<I_Props> = ({ title, children }) => {
    return (
        <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="mb-10">
                <Text className="text-blue-500" weight={700} variant="heading-6" contentKey={title} ns="common" />
            </div>
            <div className="w-full h-64">
                <ResponsiveContainer>{children}</ResponsiveContainer>
            </div>
        </div>
    )
}
