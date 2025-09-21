import styled from "@emotion/styled"
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import { ArrowLeft2 } from "iconsax-reactjs"
import type { ButtonHTMLAttributes, FC, MouseEvent, ReactElement, ReactNode } from "react"

import { Spinner } from "../Spinner"
import { Text } from "../Text"
import type { T_ButtonSize, T_ButtonVariant } from "../Theme"
import { generateButtonStyles } from "../Theme"

interface I_Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    contentKey?: KeysWithoutReturnObjects["button"]
    variant?: T_ButtonVariant
    size?: T_ButtonSize
    loading?: boolean
    icon?: ReactElement
    hasArrow?: boolean
    children?: ReactNode
}

export const Button: FC<I_Button> = ({
    contentKey,
    variant = "primary",
    size = "base",
    loading = false,
    icon,
    hasArrow = false,
    type = "button",
    children,
    className,
    disabled,
    onClick,
}) => {
    // States and Hooks
    const StyledButton = styled.button<{ variant: T_ButtonVariant }>`
        ${props => generateButtonStyles(props.variant)}
    `

    // Methods
    const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (disabled) return
        if (onClick) onClick(event)
    }

    // Render
    return (
        <StyledButton
            type={type}
            variant={variant}
            className={clsx([
                size === "base" && variant !== "ghost" && "px-[34px] py-[12px]",
                size === "sm" && variant !== "ghost" && "px-[8px] py-[4px]",
                !disabled && "cursor-pointer",
                "transition duration-300",
                "border border-solid",

                className && className,
            ])}
            onClick={onButtonClick}
            disabled={disabled}
        >
            {contentKey && !children && (
                <div
                    className={clsx([
                        "flex items-center justify-center",
                        size === "base" && "gap-2",
                        size === "sm" && "gap-1",
                    ])}
                >
                    {loading && <Spinner />}
                    {icon && icon}
                    {size === "base" && <Text contentKey={contentKey} ns="button" variant="button" weight={500} />}
                    {size === "sm" && <Text contentKey={contentKey} ns="button" variant="meta-2" weight={300} />}
                    {hasArrow && <ArrowLeft2 size={18} />}
                </div>
            )}

            {children && !contentKey && variant === "ghost" && children}
        </StyledButton>
    )
}
