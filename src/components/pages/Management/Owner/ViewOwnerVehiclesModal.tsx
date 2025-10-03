import { Divider, Input, Modal, Text } from "@components/template"
import type { T_Owner } from "@core/api"
import { Modals } from "@core/utilities"
import IranLicensePlate from "iran-license-plate"
import { type FC } from "react"

interface I_Props {
    owner: T_Owner
}

const CurrentModal = Modals.Management.Owner.ViewVehicles

export const ViewOwnerVehiclesModal: FC<I_Props> = ({ owner }) => {
    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <div className="flex items-center gap-1 min-w-xl">
                    <Text contentKey="vehicles_list_of" variant="title-1" className="text-neutral-700" weight={600} />
                    <Text
                        content={`${owner.firstname} ${owner.lastname}`}
                        variant="title-1"
                        className="text-neutral-700"
                        weight={600}
                    />
                </div>
            }
            closeButton
        >
            <div>
                {owner.vehicles.map(_ => (
                    <div className="group">
                        <div key={_.plate_number} className="w-full flex gap-4 mb-8">
                            <div className="flex flex-col grow gap-4">
                                <div className="flex items-center justify-between gap-2">
                                    <Input.Label labelKey="model" />
                                    <Text content={_.vehicle_model} />
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Input.Label labelKey="color" />
                                    <Text content={_.vehicle_color} />
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Input.Label labelKey="production_year" />
                                    <Text content={_.vehicle_year} className="font-num-fa" />
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Input.Label labelKey="plate_number" />
                                    <IranLicensePlate serial={_.plate_number} className="w-20" />
                                </div>
                            </div>

                            <div className="rounded-xl bg-zinc-100 w-40 aspect-square" />
                        </div>

                        <Divider className="mb-8 group-last:hidden" />
                    </div>
                ))}
            </div>
        </Modal>
    )
}
