import { Text } from "@components/template"
import type { T_LastTraffic } from "@core/api"
import clsx from "clsx"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"

interface I_Props {
    last: T_LastTraffic
}

export const LastTrafficView: FC<I_Props> = ({ last }) => {
    // States and Hooks
    const isAuthorized = last.authorized

    // Render
    return (
        <div className="grow flex h-full">
            <div className="flex items-center gap-6 w-full">
                {last.customer && last.customer.image_url ? (
                    <img
                        src={last.customer.image_url}
                        className="w-20 aspect-square h-full rounded-lg"
                        alt={`${last.token}`}
                    />
                ) : (
                    <div
                        className={clsx([
                            "w-20 aspect-square h-full rounded-lg flex-shrink-0",
                            isAuthorized ? "bg-emerald-300/20" : "bg-rose-300/20",
                        ])}
                    />
                )}
                <div className="flex flex-col gap-2 items-center">
                    {last.customer ? (
                        <div>
                            <Text content={`${last.customer.first_name} ${last.customer.last_name}`} weight={600} />
                        </div>
                    ) : (
                        <div className="opacity-0">---</div>
                    )}
                    {last.plate_serial ? (
                        <div>
                            <IranLicensePlate serial={last.plate_serial} className="w-20" />
                        </div>
                    ) : (
                        <div
                            className={clsx([
                                "w-[175px] h-[38.8px] rounded-lg flex-shrink-0",
                                isAuthorized ? "bg-emerald-300/20" : "bg-rose-300/20",
                            ])}
                        />
                    )}
                </div>
                {last.description && (
                    <div className="size-full flex items-start rounded-lg border border-zinc-800/20 px-3 py-1.5">
                        <div className="overflow-y-auto max-h-20 scrollbar-thin">{last.description}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
