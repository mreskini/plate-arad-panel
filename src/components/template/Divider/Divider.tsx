import clsx from "clsx"
import type { FC, HTMLAttributes } from "react"

interface I_Props extends HTMLAttributes<HTMLDivElement> {}

export const Divider: FC<I_Props> = ({ ...rest }) => {
    // States and Hooks
    const { className } = rest

    // Render
    return <div className={clsx(["border-b border-neutral-300 border-dashed w-full h-px", className])} />
}
