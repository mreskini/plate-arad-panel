/* eslint-disable no-nested-ternary */
import { Button, Text } from "@components/template"
import type { E_DayOfWeek } from "@core/api"
import { typedKeys } from "@core/functions"
import clsx from "clsx"
import { type FC, type HTMLAttributes } from "react"

import { DayOfWeekMap } from "./static"

interface I_Props extends HTMLAttributes<HTMLDivElement> {
    className?: string
    selected: E_DayOfWeek[]
    setSelected: (days: E_DayOfWeek[]) => void
    disabled?: boolean
}

export const WeekDaysSelect: FC<I_Props> = ({ className, selected, setSelected, disabled, ...rest }) => {
    // States and hooks
    const selectedSet = new Set(selected)

    // Methods
    const toggleDay = (day: E_DayOfWeek) => {
        if (selectedSet.has(day)) return setSelected(selected.filter(_ => _ !== day))
        return setSelected([...selected, day])
    }

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
                            isActive && !disabled && "bg-blue-500",
                            isActive && disabled && "bg-blue-400",
                            !isActive && "bg-white",
                        ])}
                        onClick={() => toggleDay(_)}
                        disabled={disabled}
                    >
                        <Text
                            contentKey={DayOfWeekMap[_]}
                            weight={300}
                            className={clsx([
                                isActive && !disabled && "text-white",
                                isActive && disabled && "text-white",
                                !isActive && disabled && "text-neutral-500",
                                !isActive && !disabled && "text-neutral-700",
                            ])}
                            variant="meta-2"
                        />
                    </Button>
                )
            })}
        </div>
    )
}
