import { Button, Text } from "@components/template"
import type { E_DayOfWeek } from "@core/api"
import { typedKeys } from "@core/functions"
import clsx from "clsx"
import { type FC, type HTMLAttributes } from "react"

import { DayOfWeekMap } from "./static"

interface I_Props extends HTMLAttributes<HTMLDivElement> {
    className?: string
    selected: E_DayOfWeek[]
}

export const WeekDaysView: FC<I_Props> = ({ className, selected, ...rest }) => {
    // States and hooks
    const selectedSet = new Set(selected)

    // Render
    return (
        <div
            className={clsx([
                "flex items-center justify-between rounded-md border-neutral-300 border-solid border",
                className,
            ])}
            {...rest}
        >
            {typedKeys(DayOfWeekMap).map(_ => {
                const isActive = selectedSet.has(_)

                return (
                    <Button
                        key={_}
                        variant="ghost"
                        className={clsx([
                            "border-0 w-full cursor-default last:border-l-0 text-center border-l border-neutral-300 px-1 py-2 first:rounded-r-md last:rounded-l-md",
                            isActive && "bg-blue-500",
                            !isActive && "bg-white",
                        ])}
                        disabled
                    >
                        <Text
                            contentKey={DayOfWeekMap[_]}
                            weight={300}
                            className={clsx([isActive && "text-white", !isActive && "text-neutral-700"])}
                            variant="meta-2"
                        />
                    </Button>
                )
            })}
        </div>
    )
}
