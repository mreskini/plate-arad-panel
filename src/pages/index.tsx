import { Loading } from "@components/common"
import { Layout } from "@components/layout"
import { ClientCameraModal, ClientCard, EmptyDashboard, OpenDoorModal } from "@components/pages/Dashboard"
import type { T_Client, T_Door } from "@core/api"
import { useCommon } from "@core/contexts"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import clsx from "clsx"
import { useEffect, useState } from "react"

const Dashboard = () => {
    // States and Hooks
    const { fetchClients } = useCommon()
    const { modalVisibility } = useModal()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [selectedDoor, setSelectedDoor] = useState<T_Door>()
    const [clients, setClients] = useState<T_Client[]>([])
    const [currentClient, setCurrentClient] = useState<T_Client | null>(null)

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
        <Layout.Dashboard>
            {modalVisibility[Modals.Monitoring.OpenDoor] && <OpenDoorModal door={selectedDoor!} />}
            {modalVisibility[Modals.Monitoring.CameraModal] && <ClientCameraModal client={currentClient!} />}

            {isFetching && <Loading.Screen />}

            {!isFetching && camerasCount === 0 && <EmptyDashboard />}

            {!isFetching && camerasCount > 0 && (
                <div className="w-full h-full">
                    <div className={clsx(["grid gap-x-8 grid-cols-3"])}>
                        {clients.map(_ => (
                            <ClientCard
                                key={_.token}
                                client={_}
                                onDoorSelect={setSelectedDoor}
                                setCurrentClient={setCurrentClient}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Layout.Dashboard>
    )
}

export default Dashboard
