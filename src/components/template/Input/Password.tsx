import clsx from "clsx"
import { Eye } from "iconsax-reactjs"
import type { FC } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import type { I_Password } from "./Input.types"

export const Password: FC<I_Password> = ({ placeholder, icon, ...rest }) => {
    // States and hooks
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { t } = useTranslation("input")

    // Render
    return (
        <div className="relative flex items-center">
            <input
                type={showPassword ? "text" : "password"}
                className="peer w-full rounded-md border border-solid border-neutral-300 bg-white py-2 px-4 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                placeholder={t(placeholder)}
                {...rest}
            />

            <span className="absolute inset-y-0 left-0 mb-0 flex items-center pl-4 text-neutral-400 peer-focus:text-blue-500">
                <div className="flex items-center justify-center">{icon}</div>
            </span>

            <button
                className={clsx(
                    "absolute inset-y-0 end-4 mb-0 flex cursor-pointer items-center pr-4",
                    showPassword ? "text-blue-300" : "text-neutral-300"
                )}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
            >
                <div className="flex items-center justify-center">
                    <Eye />
                </div>
            </button>
        </div>
    )
}
