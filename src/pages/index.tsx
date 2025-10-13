import { Loading, Status } from "@components/common"
import { Layout } from "@components/layout"
import { DashboardWrapper } from "@components/pages/Dashboard"
import { useCommon } from "@core/contexts"
import clsx from "clsx"
import IranLicensePlate from "iran-license-plate"
import { range } from "lodash"
import { useEffect, useState } from "react"

const Dashboard = () => {
    // States and Hooks
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const { fetchParkingInfo, fetchCurrentUser } = useCommon()

    // TODO: Remove testing camerasCount after API integration
    const [camerasCount] = useState<number>(4)

    // Methods
    const initialization = async () => {
        await fetchCurrentUser()
        await fetchParkingInfo()
        setIsFetching(false)
    }

    // Use effects
    useEffect(() => {
        initialization()
    }, [])

    // Render
    return (
        <Layout.Dashboard className="pb-8">
            {isFetching && <Loading.Screen />}

            {!isFetching && (
                <DashboardWrapper>
                    <div
                        className={clsx([
                            "grid gap-4 w-full h-full",
                            camerasCount === 1 && "grid-cols-1",
                            camerasCount === 2 && "grid-cols-2",
                            camerasCount >= 3 && "grid-cols-3",
                        ])}
                    >
                        {range(0, camerasCount).map(_ => (
                            <div key={_} className="flex h-full flex-col">
                                <div className="flex-1 bg-zinc-100 rounded-xl mb-4">
                                    <div className="w-full h-full rounded-xl bg-zinc-200 flex items-center justify-center" />
                                </div>

                                <div className="flex items-center justify-between w-full rounded-xl bg-zinc-50 p-3 flex-shrink-0">
                                    <div className="w-16 h-16 bg-zinc-200 rounded-lg flex-shrink-0" />

                                    <div className="flex flex-col gap-2 items-end">
                                        <Status
                                            contentKey="not_allowed"
                                            variant="error"
                                            wrapperClassName="w-full justify-center"
                                        />

                                        <div>
                                            <IranLicensePlate serial="IR60-321b12" className="w-20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardWrapper>
            )}
        </Layout.Dashboard>
    )
}

export default Dashboard
