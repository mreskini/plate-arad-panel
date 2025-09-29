import { Loading, Status } from "@components/common"
import { Layout } from "@components/layout"
import { Button, DashboardWrapper, Input } from "@components/template"
import { sleep } from "@core/functions"
import IranLicensePlate from "iran-license-plate"
import { useEffect, useState } from "react"

const Dashboard = () => {
    // States and Hooks
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isCameraConnected, setIsCameraConnected] = useState<boolean>(false)
    const [cameraRtsp, setCameraRtsp] = useState<string>("")
    const [cameraName, setCameraName] = useState<string>("")

    // Flags
    const isValid = cameraRtsp.trim() !== "" && cameraName.trim() !== ""

    // Methods
    const initialization = async () => {
        setIsFetching(false)
    }

    const connectCameraHandler = async () => {
        setIsSubmitting(true)
        await sleep(2000)
        setIsCameraConnected(true)
        setIsSubmitting(false)
    }

    // Use effects
    useEffect(() => {
        initialization()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {isFetching && <Loading.Screen />}

            {isCameraConnected && !isFetching && (
                <DashboardWrapper>
                    <div className="h-[640px] w-full bg-zinc-100 rounded-xl mb-6" />
                    <div className="flex items-center justify-between w-full rounded-xl bg-zinc-50 p-2">
                        <div className="w-20 h-20 bg-zinc-200 rounded-lg" />
                        <div className="flex flex-col gap-2">
                            <Status contentKey="not_allowed" variant="error" wrapperClassName="w-full justify-center" />
                            <div>
                                <IranLicensePlate serial="IR15-546b55" className="w-20" />
                            </div>
                        </div>
                    </div>
                </DashboardWrapper>
            )}

            {!isCameraConnected && !isFetching && (
                <DashboardWrapper title="connect_camera">
                    <div className="flex items-center justify-center size-full gap-8">
                        <div className="flex w-full items-center gap-2">
                            <Input.Label labelKey="connection_string" className="min-w-32" required />
                            <Input
                                placeholder="rtsp_example"
                                disabled={isSubmitting}
                                value={cameraRtsp}
                                onChange={e => setCameraRtsp(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="flex w-full items-center gap-2">
                            <Input.Label labelKey="camera_name" className="min-w-32" required />
                            <Input
                                placeholder="camera_name_example"
                                disabled={isSubmitting}
                                value={cameraName}
                                onChange={e => setCameraName(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <Button
                            contentKey="connect"
                            type="submit"
                            className="min-w-40"
                            onClick={connectCameraHandler}
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
                        />
                    </div>
                </DashboardWrapper>
            )}
        </Layout.Dashboard>
    )
}

export default Dashboard
