import clsx from "clsx"
import type { ChangeEvent, FC } from "react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import type { I_Number } from "./Input.types"

export const Numeric: FC<I_Number> = ({
    placeholder = "example_number",
    setValue = () => {},
    icon,
    className,
    value: propValue,
    onChange,
    ...rest
}) => {
    // States and Hooks
    const { t } = useTranslation("input")
    const [displayValue, setDisplayValue] = useState("")

    // Format the number with thousands separators
    const formatNumber = (num: string | number): string => {
        if (num === "" || num === null || num === undefined) return ""

        const numValue = typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num

        return Number.isNaN(numValue) ? "" : numValue.toLocaleString()
    }

    // Parse the formatted string back to a number string
    const parseNumber = (formattedValue: string): string => {
        return formattedValue.replace(/,/g, "")
    }

    // Handle display changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = parseNumber(e.target.value)
        const formattedValue = formatNumber(rawValue)
        setDisplayValue(formattedValue)

        // Update the actual numeric value
        const numericValue = rawValue === "" ? NaN : parseFloat(rawValue)

        // Create a proper ChangeEvent
        const event: ChangeEvent<HTMLInputElement> = {
            ...e,
            target: {
                ...e.target,
                value: rawValue,
                valueAsNumber: numericValue,
            },
            currentTarget: {
                ...e.currentTarget,
                value: rawValue,
                valueAsNumber: numericValue,
            },
        }

        if (onChange) onChange(event)
        setValue(numericValue)
    }

    // Sync with external value changes
    useEffect(() => {
        if (propValue !== undefined && propValue !== null) {
            const numValue = Array.isArray(propValue) ? propValue.join("") : propValue.toString()
            setDisplayValue(formatNumber(numValue))
        }
    }, [propValue])

    // Render
    return (
        <div className={clsx(["relative flex items-center", className])}>
            <input
                type="text"
                inputMode="numeric"
                className="peer number-input w-full rounded-md border border-solid border-neutral-300 bg-white py-2 px-4 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                placeholder={t(placeholder)}
                value={displayValue}
                onChange={handleChange}
                {...rest}
            />

            {icon && (
                <span className="absolute inset-y-0 left-0 mb-0 flex items-center pl-4 text-neutral-300 peer-focus:text-blue-300">
                    <div className="flex items-center justify-center">{icon}</div>
                </span>
            )}
        </div>
    )
}
