import clsx from "clsx"
import type { FC } from "react"

import { Text } from "../Text"
import type { I_Label } from "./Input.types"

export const Label: FC<I_Label> = ({ labelKey, className, required }) => {
    // Render
    return (
        <div className={clsx(["flex items-center gap-1", className])}>
            <Text
                contentKey={labelKey}
                variant="body"
                className={clsx(["text-neutral-800 text-nowrap"])}
                weight={300}
                ns="input"
            />

            {required && <Text content="*" variant="body" className="text-red-500" weight={300} />}
        </div>
    )
}
