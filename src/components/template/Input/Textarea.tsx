import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

import type { I_Textarea } from "./Input.types"

export const Textarea = forwardRef<HTMLTextAreaElement, I_Textarea>(({ placeholder, ...rest }, ref) => {
    // States and hooks
    const { t } = useTranslation("input")

    // Render
    return (
        <div className="relative flex items-center w-full">
            <textarea
                ref={ref}
                className="peer w-full rounded-md border border-solid border-neutral-300 bg-white py-2 px-4 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                placeholder={t(placeholder)}
                rows={3}
                {...rest}
            />
        </div>
    )
})
