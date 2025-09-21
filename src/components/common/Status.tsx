import { Text } from "@components/template"
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import type { FC, HTMLAttributes, ReactNode } from "react"

export type T_StatusVariant = "success" | "warning" | "error" | "info"

interface I_Props extends HTMLAttributes<HTMLDivElement> {
    variant?: T_StatusVariant
    wrapperClassName?: string
    contentKey: KeysWithoutReturnObjects["status"] | KeysWithoutReturnObjects["input"]
    icon?: ReactNode
}

export const Status: FC<I_Props> = ({ variant = "success", wrapperClassName = "", contentKey, icon, ...rest }) => {
    // Render
    return (
        <div
            className={clsx([
                wrapperClassName,
                "px-2 py-1 rounded-md w-fit flex items-center gap-2",
                variant === "success" && "bg-emerald-50 text-emerald-500",
                variant === "warning" && "bg-orange-50 text-orange-400",
                variant === "info" && "bg-blue-50 text-blue-400",
                variant === "error" && "bg-red-50 text-red-400",
            ])}
            {...rest}
        >
            {icon && icon}
            <Text variant="meta-2" weight={300} contentKey={contentKey} ns="status" />
        </div>
    )
}
