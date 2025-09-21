import clsx from "clsx"
import { Calendar, CloseCircle } from "iconsax-reactjs"
import { useRef } from "react"
import type DateObject from "react-date-object"
import persian from "react-date-object/calendars/persian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import persian_fa from "react-date-object/locales/persian_fa"
import { useTranslation } from "react-i18next"
import type { DatePickerRef } from "react-multi-date-picker"
import ReactMultiDatePicker from "react-multi-date-picker"

import { Button } from "../Button"
import type { T_DatePicker } from "./Input.types"

export const DatePicker = ({
    wrapperClassName,
    placeholder = "please_select",
    className,
    onChange,
    clearable = false,
    ...rest
}: T_DatePicker) => {
    // States and Hooks
    const { value, disabled } = rest
    const { t } = useTranslation("input")
    const isClearButtonAvailable = value && clearable
    const pickerRef = useRef<DatePickerRef>(null)

    // Methods
    const handleChangeWrapper = (date: DateObject | DateObject[] | null) => {
        if (date) {
            const dateObj = Array.isArray(date) ? date[0] : date
            const gregorianDate = dateObj.convert(persian, gregorian_en)
            onChange?.(gregorianDate.toDate())
        }

        if (!date) {
            if (clearable) {
                ;(onChange as (date: Date | null) => void)?.(null)
            }
        }
    }

    const clearSelectedValue = () => handleChangeWrapper(null)

    const handlePickerIconClick = () => {
        if (pickerRef.current && !disabled) {
            pickerRef.current.openCalendar()
        }
    }

    return (
        <div className={clsx(["relative w-full flex items-center", wrapperClassName])}>
            <ReactMultiDatePicker
                ref={pickerRef}
                placeholder={t(placeholder)}
                className={clsx("w-full border-none", className)}
                calendar={persian}
                containerClassName="border-none w-full"
                inputClass="peer w-full rounded-md border border-solid border-neutral-300 caret-transparent cursor-pointer bg-white py-2 px-4 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                locale={persian_fa}
                monthYearSeparator="-"
                weekDays={["ش", "ی", "د", "س", "چ", "پ", "ج"]}
                calendarPosition="bottom"
                onChange={handleChangeWrapper}
                {...rest}
            />

            {!isClearButtonAvailable && (
                <Calendar
                    className="peer-focus:!text-blue-300 cursor-pointer size-6 absolute text-neutral-300 left-4 text top-1/2 -translate-y-1/2"
                    onClick={handlePickerIconClick}
                />
            )}

            {isClearButtonAvailable && (
                <Button
                    variant="ghost"
                    disabled={disabled}
                    className="disabled:text-neutral-300 text-red-500 absolute left-4 top-1/2 -translate-y-1/2"
                    onClick={clearSelectedValue}
                >
                    <CloseCircle className="cursor-pointer size-5" />
                </Button>
            )}
        </div>
    )
}
