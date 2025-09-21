/* eslint-disable jsx-a11y/label-has-associated-control */
import { Text } from "@components/template"
import clsx from "clsx"
import type { FC } from "react"
import { useId } from "react"

import type { I_Checkbox } from "./Input.types"

export const Checkbox: FC<I_Checkbox> = ({ labelKey, className, wrapperClassName, ns = "input", ...rest }) => {
    const id = useId()
    // Render
    return (
        <div className={clsx(["flex items-center gap-2", wrapperClassName])}>
            <input type="checkbox" {...rest} id={id} className="w-4 h-4" />
            <label htmlFor={id}>
                <Text
                    contentKey={labelKey}
                    variant="body"
                    className={clsx(["text-neutral-800 text-nowrap select-none", className])}
                    weight={300}
                    ns={ns}
                />
            </label>
        </div>
    )
}
