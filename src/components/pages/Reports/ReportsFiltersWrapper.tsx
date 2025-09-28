import clsx from "clsx"
import type { FC, HTMLAttributes, ReactNode } from "react"

interface I_Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export const ReportsFiltersWrapper: FC<I_Props> = ({ children, ...rest }) => {
    const { className } = rest
    return <div className={clsx(["p-4 border border-neutral-200 rounded-2xl mb-4 mt-2", className])}>{children}</div>
}
