import { ArrowDown2, ArrowUp2 } from "iconsax-reactjs"
import type { FC } from "react"
import { useTranslation } from "react-i18next"
import type { DropdownIndicatorProps, StylesConfig } from "react-select"
import Select, { components } from "react-select"

import type { I_MultiSelect, T_InputDropdownOption } from "./Input.types"

export const MultiSelect: FC<I_MultiSelect> = ({
    placeholder,
    selected,
    setSelected,
    options,
    disabled,
    loading = false,
}) => {
    // States and hooks
    const { t } = useTranslation("input")

    const selectedOptions = selected
        .map(_ => options.find(option => option.value === _)!)
        .map(_ => {
            if (_.labelKey) return { label: t(_.labelKey), value: _.value }
            return { label: _.label, value: _.value }
        })

    const customStyles: StylesConfig<T_InputDropdownOption, true> = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            minHeight: "42px",
            borderRadius: "6px",
            borderColor: state.isFocused ? "#93c5fd" : "#d4d4d4",
            paddingLeft: "12px",
            paddingRight: "9px",
            cursor: "pointer",
            backgroundColor: state.isDisabled || loading ? "#f5f5f5" : "#fff",
            ":hover": {
                borderColor: state.isFocused ? "#93c5fd" : "#d4d4d4",
            },
        }),
        menu: provided => ({
            ...provided,
            zIndex: 20,
            marginTop: "8px",
        }),
        menuList: provided => ({
            ...provided,
            paddingTop: "0px",
            paddingBottom: "0px",
            borderRadius: "6px",
            boxShadow: "none",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#eff6ff" : "#fff",
            color: state.isSelected ? "#2563eb" : "#525252",
            fontSize: "14px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: 300,
            borderBottomWidth: "1px",
            borderBottomColor: "#d4d4d4",
            ":last-child": {
                borderBottomWidth: "0px",
            },
            ":active": {
                background: "inherit",
            },
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: state.isDisabled || loading ? "#d4d4d4" : "#eff6ff",
            borderRadius: "4px",
        }),
        multiValueLabel: provided => ({
            ...provided,
            color: "#2563eb",
            fontSize: "14px",
            padding: "2px 6px",
        }),
        multiValueRemove: provided => ({
            ...provided,
            color: "#2563eb",
            ":hover": {
                backgroundColor: "#dbeafe",
                color: "#1e40af",
            },
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: state.isDisabled ? "#71717a" : "#d4d4d4",
            fontSize: "16px",
            fontWeight: 300,
        }),
        dropdownIndicator: provided => ({
            ...provided,
            padding: "8px",
        }),
        valueContainer: provided => ({
            ...provided,
            paddingRight: "4px",
        }),
        clearIndicator: provided => ({
            ...provided,
            color: "#a3a3a3",
            ":hover": {
                color: "#3b82f6",
            },
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        noOptionsMessage: provided => ({
            ...provided,
            fontSize: "14px",
            fontWeight: 300,
            color: "#d4d4d4",
            textAlign: "right",
            paddingRight: "16px",
        }),
    }

    // Render
    return (
        <Select
            styles={customStyles}
            placeholder={t(placeholder || "please_select")}
            isDisabled={disabled || loading}
            isClearable={false}
            options={options.map(_ => {
                if (_.labelKey) return { label: t(_.labelKey), value: _.value }
                return { label: _.label, value: _.value }
            })}
            defaultValue={selectedOptions}
            onChange={values => setSelected(values.map(_ => _.value))}
            noOptionsMessage={() => t("no_options_found")}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
            isMulti
        />
    )
}

const CustomDropdownIndicator = (props: DropdownIndicatorProps<T_InputDropdownOption, true>) => {
    return (
        <components.DropdownIndicator {...props}>
            {props.isFocused && <ArrowUp2 size={20} className="text-neutral-300" />}
            {!props.isFocused && <ArrowDown2 size={20} className="text-neutral-300" />}
        </components.DropdownIndicator>
    )
}
