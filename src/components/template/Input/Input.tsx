/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import type { FC, InputHTMLAttributes, ReactNode } from "react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { Checkbox } from "./Checkbox"
import { DatePicker } from "./DatePicker"
import { DateTimePicker } from "./DateTimePicker"
import { DropDown } from "./DropDown"
import type {
    I_Checkbox,
    I_DropDown,
    I_Label,
    I_MultiSelect,
    I_Number,
    I_Password,
    I_PlateNumber,
    I_Textarea,
    T_DatePicker,
} from "./Input.types"
import { Label } from "./Label"
import { MultiSelect } from "./MultiSelect"
import { Numeric } from "./Numeric"
import { Password } from "./Password"
import { PlateNumber } from "./PlateNumber"
import { Textarea } from "./Textarea"
import { TimePicker } from "./TimePicker"

interface I_Props extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: KeysWithoutReturnObjects["input"]
    icon?: ReactNode
}

interface I_Input extends FC<I_Props> {
    Password: FC<I_Password>
    DatePicker: FC<T_DatePicker>
    TimePicker: FC<T_DatePicker>
    DateTimePicker: FC<T_DatePicker>
    Label: FC<I_Label>
    Checkbox: FC<I_Checkbox>
    DropDown: FC<I_DropDown>
    PlateNumber: FC<I_PlateNumber>
    Textarea: FC<I_Textarea>
    Number: FC<I_Number>
    MultiSelect: FC<I_MultiSelect>
}

export const Input: I_Input = ({ placeholder, icon, disabled, className, ...rest }) => {
    // States and Hooks
    const { t } = useTranslation("input")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleIconClick = () => {
        if (inputRef.current && !disabled) {
            inputRef.current.focus()
        }
    }

    // Render
    return (
        <div className={clsx(["relative flex items-center", className])}>
            {/* TODO: Update input colors with theme values */}
            <input
                ref={inputRef}
                type="text"
                className="peer w-full rounded-md border border-solid border-neutral-300 bg-white py-2 px-4 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                placeholder={t(placeholder)}
                multiple
                disabled={disabled}
                {...rest}
            />

            {icon && (
                <span
                    className="absolute inset-y-0 left-0 mb-0 flex items-center pl-4 text-neutral-300 peer-focus:text-blue-300 cursor-pointer"
                    onClick={handleIconClick}
                >
                    <div className="flex items-center justify-center">{icon}</div>
                </span>
            )}
        </div>
    )
}

Input.Password = Password
Input.TimePicker = TimePicker
Input.DateTimePicker = DateTimePicker
Input.DatePicker = DatePicker
Input.Label = Label
Input.Checkbox = Checkbox
Input.DropDown = DropDown
Input.PlateNumber = PlateNumber
Input.Textarea = Textarea
Input.Number = Numeric
Input.MultiSelect = MultiSelect
