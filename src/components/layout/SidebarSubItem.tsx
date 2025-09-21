import { Button, Text } from "@components/template"
import clsx from "clsx"
import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import { ArrowCircleLeft } from "iconsax-reactjs"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"

interface I_Props {
    isActive: boolean
    link: string
    titleContentKey: KeysWithoutReturnObjects[FlatNamespace]
}

export const SidebarSubItem: FC<I_Props> = ({ isActive, link, titleContentKey }) => {
    // States and Hooks
    const navigate = useNavigate()

    // Render
    return (
        <Button
            variant="ghost"
            className={clsx([
                "flex items-center gap-2.5 rounded-xl p-2 mt-[10px] text-zinc-600 pr-6",
                isActive ? "bg-neutral-200/80 text-zinc-800" : " hover:bg-zinc-200",
            ])}
            onClick={() => navigate(link)}
        >
            <div className="ml-1">
                <ArrowCircleLeft className="size-4.5 text-inherit" />
            </div>
            <Text ns="common" contentKey={titleContentKey} variant="body" className="hidden lg:block" />
        </Button>
    )
}
