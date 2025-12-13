import { Text } from "@components/template"
import { Images } from "@core/utilities"

export const EmptyDashboard = () => {
    // Render
    return (
        <div className="flex items-center justify-center size-full">
            <div className="text-center">
                <div>
                    <img src={Images.DashboardDefaultThumbnail} alt="Dashboard default thumbnail" className="mx-auto" />
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
    )
}
