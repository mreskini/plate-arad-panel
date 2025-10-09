import { Text } from "@components/template"
import clsx from "clsx"
import type { KeysWithoutReturnObjects } from "i18next"
import type { FC, ReactNode } from "react"

interface I_Props {
    title?: KeysWithoutReturnObjects["common"]
    children: ReactNode
    className?: string
}

export const SettingsWrapper: FC<I_Props> = ({ title, children, className }) => {
    return (
        <div className={clsx(["rounded-2xl h-full border border-neutral-200 p-5", className])}>
            {title && (
                <div className="mb-10">
                    <Text className="text-blue-500" weight={700} variant="heading-6" contentKey={title} ns="common" />
                </div>
            )}
            <div className="w-full">{children}</div>
        </div>
    )
}
