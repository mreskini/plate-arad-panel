import clsx from "clsx"
import type { FC } from "react"

import { type I_Text, Text } from "../Text"

type T_NoticeType = "error" | "warning" | "info"

interface I_Props extends I_Text {
    type?: T_NoticeType
    wrapperClassName?: string
}

export const Notice: FC<I_Props> = ({ type = "warning", wrapperClassName, ...rest }) => {
    return (
        // TODO: Fix interpolation with date and time values considering HTML special characters like "/"
        <div
            className={clsx([
                wrapperClassName,
                "rounded-lg px-4 py-3 border",
                type === "warning" && "bg-yellow-50 border-yellow-500 text-yellow-600",
                type === "error" && "bg-red-50 border-red-500 text-red-600",
                type === "info" && "bg-blue-50 border-blue-500 text-blue-600",
            ])}
        >
            <Text {...rest} weight={300} />
        </div>
    )
}
