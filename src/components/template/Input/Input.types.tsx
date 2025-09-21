import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import type { ChangeEvent, InputHTMLAttributes, ReactNode, Ref, TextareaHTMLAttributes } from "react"
import type { CalendarProps, DatePickerProps } from "react-multi-date-picker"

type T_ReactDatePickerProps = Omit<CalendarProps, "onChange"> & Omit<DatePickerProps, "onChange">

export interface I_Password extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: KeysWithoutReturnObjects["input"]
    icon?: ReactNode
}

export interface I_Number extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    placeholder?: KeysWithoutReturnObjects["input"]
    icon?: ReactNode
    setValue?: (value: number) => void
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string | number | readonly string[]
}

export interface I_Textarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: KeysWithoutReturnObjects["input"]
}

export interface I_Checkbox extends InputHTMLAttributes<HTMLInputElement> {
    labelKey: KeysWithoutReturnObjects[FlatNamespace]
    ns?: FlatNamespace
    className?: string
    wrapperClassName?: string
}

// Date picker types
type T_BaseDatePickerProps = {
    wrapperClassName?: string
    placeholder?: KeysWithoutReturnObjects["input"]
    value?: Date | null
} & T_ReactDatePickerProps

export type T_DatePicker =
    | (T_BaseDatePickerProps & {
          clearable: true
          onChange?: (date: Date | null) => void
      })
    | (T_BaseDatePickerProps & {
          clearable?: false
          onChange?: (date: Date) => void
      })
// -----------------

export type T_InputDropdownOption = {
    labelKey?: KeysWithoutReturnObjects["input"]
    label?: string
    value: string
}
export interface I_DropDown extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: KeysWithoutReturnObjects["input"]
    value?: string
    setValue: Function
    icon?: ReactNode
    options: T_InputDropdownOption[]
    loading?: boolean
    wrapperClassName?: string
    onSearch?: (searchTerm: string) => Promise<T_InputDropdownOption[]> | void
    clearable?: boolean
}

export type T_MinimalDropdownOption = {
    labelKey: KeysWithoutReturnObjects["letters"]
    value: string
}
export interface I_MinimalDropDown extends InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement>
    value: string
    setValue: Function
    icon?: ReactNode
    options: T_MinimalDropdownOption[]
    loading?: boolean
    wrapperClassName?: string
}

export interface I_Label {
    labelKey: KeysWithoutReturnObjects["input"]
    required?: boolean
    className?: string
}

export interface I_PlateNumber extends InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string
    initialValue?: string
    setValue?: Function
    clearable?: boolean
}

export interface I_MultiSelect extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: KeysWithoutReturnObjects["input"]
    setSelected: Function
    selected: string[]
    options: T_InputDropdownOption[]
    loading?: boolean
}
