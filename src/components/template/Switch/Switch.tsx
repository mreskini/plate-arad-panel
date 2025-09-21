/* eslint-disable jsx-a11y/control-has-associated-label */
import { type FC, type InputHTMLAttributes, useState } from "react"

interface I_Switch extends InputHTMLAttributes<HTMLInputElement> {
    checked: boolean
    onSwitchToggle?: Function
}

export const Switch: FC<I_Switch> = ({ checked, onSwitchToggle = () => {}, disabled = false }) => {
    // States and hooks
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Methods
    const toggleHandler = async () => {
        setIsLoading(true)
        await onSwitchToggle()
        setIsLoading(false)
    }

    // Render
    return (
        <>
            <input type="checkbox" checked={checked} className="peer sr-only" />

            {/* TODO: Update switch colors with theme values */}
            <button
                type="button"
                onClick={toggleHandler}
                disabled={disabled || isLoading}
                className="peer relative h-6 w-11 cursor-pointer rounded-full bg-switch-unchecked-fill after:absolute after:end-[2px] peer-checked:after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-switch-unchecked-handle-border after:bg-switch-handle-fill after:transition-all after:content-[''] disabled:bg-switch-unchecked-fill-disabled peer-checked:bg-switch-checked-fill peer-checked:after:border-switch-checked-handle-border peer-checked:disabled:bg-switch-checked-fill-disabled"
            />
        </>
    )
}
