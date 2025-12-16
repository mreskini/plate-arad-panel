import { Text } from "@components/template"
import type { T_LastTraffic } from "@core/api"
import IranLicensePlate from "iran-license-plate"
import type { FC } from "react"

interface I_Props {
    last: T_LastTraffic
}

export const LastTrafficView: FC<I_Props> = ({ last }) => {
    // Render
    return (
        <div className="grow flex items-center h-full">
            <div className="flex items-center gap-4">
                {last.customer && last.customer.image_url ? (
                    <img
                        src={last.customer.image_url}
                        className="w-20 aspect-square h-full rounded-lg"
                        alt={`${last.token}`}
                    />
                ) : (
                    <div className="w-20 aspect-square h-full bg-zinc-200 rounded-lg flex-shrink-0" />
                )}
                <div className="flex flex-col gap-2 items-center">
                    {last.customer && (
                        <div>
                            <Text content={`${last.customer.first_name} ${last.customer.last_name}`} weight={600} />
                        </div>
                    )}
                    <div>
                        <IranLicensePlate serial="IR60-321b12" className="w-20" />
                    </div>
                </div>
            </div>
        </div>
    )
}
