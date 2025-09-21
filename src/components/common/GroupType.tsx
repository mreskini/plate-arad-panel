import { Text } from "@components/template"
import clsx from "clsx"
import { Money } from "iconsax-reactjs"
import type { FC } from "react"

interface I_Props {
    type: string
}

export const GroupType: FC<I_Props> = ({ type }) => {
    // Render
    return (
        <div
            className={clsx([
                "px-3 py-2 rounded-md flex gap-2.5 items-center",
                type === "CASH" && "bg-blue-50",
                type === "CREDIT" && "bg-orange-50",
            ])}
        >
            {type === "CASH" && (
                <>
                    <Money size={16} className="text-blue-500" />
                    <Text contentKey="cash" variant="meta-2" className="text-blue-500" />
                </>
            )}

            {type === "CREDIT" && (
                <>
                    <Money size={16} className="text-orange-500" />
                    <Text contentKey="credit" variant="meta-2" className="text-orange-500" />
                </>
            )}
        </div>
    )
}
