import { Loading } from "@components/common"
import { Layout } from "@components/layout"
import { Text } from "@components/template"
import { Images } from "@core/utilities"
import { useEffect, useState } from "react"

const Dashboard = () => {
    // States and Hooks
    const [isFetching, setIsFetching] = useState(true)

    const initialization = async () => {
        setIsFetching(false)
    }

    useEffect(() => {
        initialization()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {isFetching && <Loading.Screen />}

            {!isFetching && (
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
                                contentKey="default_title"
                                ns="dashboard"
                            />
                        </div>
                        <div className="mt-8">
                            <Text
                                variant="meta-1"
                                className="text-neutral-400"
                                contentKey="default_description"
                                ns="dashboard"
                            />
                        </div>
                    </div>
                </div>
            )}
        </Layout.Dashboard>
    )
}

export default Dashboard
