import { Loading, Status } from "@components/common"
import { Layout } from "@components/layout"
import { CameraViewer, DashboardWrapper, OpenDoorModal } from "@components/pages/Dashboard"
import { Button, Text } from "@components/template"
import type { T_Client, T_Door } from "@core/api"
import { useCommon } from "@core/contexts"
import { useModal } from "@core/stores"
import { Images, Modals } from "@core/utilities"
import clsx from "clsx"
import { Key } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { useEffect, useState } from "react"

const Dashboard = () => {
    // States and Hooks
    const { fetchClients } = useCommon()
    const { modalVisibility, openModal } = useModal()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [selectedDoor, setSelectedDoor] = useState<T_Door>()
    const [clients, setClients] = useState<T_Client[]>([])

    const camerasCount = clients.length

    // Methods
    const initialization = async () => {
        const data = await fetchClients()
        setClients(data)
        setIsFetching(false)
    }

    // Use effects
    useEffect(() => {
        initialization()
    }, [])

    // Render
    return (
        <Layout.Dashboard className="pb-8">
            {modalVisibility[Modals.Monitoring.OpenDoor] && <OpenDoorModal door={selectedDoor!} />}

            {isFetching && <Loading.Screen />}

            {!isFetching && camerasCount === 0 && (
                <div className="flex items-center justify-center size-full">
                    <div className="text-center">
                        <div>
                            <img
                                src={Images.DashboardDefaultThumbnail}
                                alt="Dashboard default thumbnail"
                                className="mx-auto"
                            />
                        </div>
                        <div className="mt-8">
                            <Text
                                variant="heading-6"
                                className="text-neutral-700"
                                weight={600}
                                contentKey="no_clients_found_indicator"
                            />
                        </div>
                    </div>
                </div>
            )}

            {!isFetching && camerasCount > 0 && (
                <DashboardWrapper>
                    <div
                        className={clsx([
                            "grid gap-4 w-full h-full",
                            camerasCount === 1 && "grid-cols-1",
                            camerasCount === 2 && "grid-cols-2",
                            camerasCount >= 3 && "grid-cols-3",
                        ])}
                    >
                        {clients.map(_ => (
                            <div key={_.token} className="flex h-full flex-col">
                                <div className="mb-4">
                                    {_.camera && <CameraViewer client={_} />}
                                    {!_.camera && (
                                        <div className="flex-1 bg-zinc-100 rounded-xl aspect-video">
                                            <div className="w-full h-full rounded-xl bg-zinc-200 flex items-center justify-center" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end justify-end gap-4 w-full rounded-xl bg-zinc-50 p-3 flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setSelectedDoor({ token: "door-token", name: "گذرگاه اصلی" })
                                            openModal(Modals.Monitoring.OpenDoor)
                                        }}
                                        className="bg-red-400 rounded-lg p-1 me-auto w-8 h-8 flex items-center justify-center"
                                    >
                                        <Key size={16} variant="Bold" className="text-white" />
                                    </Button>

                                    <div className="w-auto aspect-square h-full bg-zinc-200 rounded-lg flex-shrink-0" />

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
