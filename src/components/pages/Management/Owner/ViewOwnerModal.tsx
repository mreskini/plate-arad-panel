import { Status } from "@components/common"
import { Divider, Input, Modal, Text } from "@components/template"
import { E_IdentifierType, type T_Customer } from "@core/api"
import { formatNationalCode, formatPhoneNumber } from "@core/functions"
import { Modals } from "@core/utilities"
import { Car, Card, Money } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { type FC } from "react"
import { Link } from "react-router-dom"

interface I_Props {
    owner: T_Customer
}

const CurrentModal = Modals.Owner.View

export const ViewOwnerModal: FC<I_Props> = ({ owner }) => {
    // Flags
    const hasVehicles = owner.vehicles && owner.vehicles.length > 0
    const hasIdentifiers = owner.identifiers && owner.identifiers.length > 0

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={
                <div className="flex items-center gap-1 min-w-md">
                    <Text
                        content={`${owner.first_name} ${owner.last_name}`}
                        variant="title-1"
                        className="text-neutral-700"
                        weight={600}
                    />
                </div>
            }
            closeButton
        >
            <div className="flex items-center justify-between mb-4">
                <Input.Label labelKey="national_code" />
                <Text content={formatNationalCode(owner.national_code)} />
            </div>

            <div className="flex items-center justify-between mb-4">
                <Input.Label labelKey="phone_number" />
                <Text content={formatPhoneNumber(owner.mobile)} />
            </div>

            {hasIdentifiers && <Divider className="my-4" />}

            {hasIdentifiers &&
                owner.identifiers?.map(_ => (
                    <div key={_.token} className="flex items-start justify-between mb-4">
                        {_.type === E_IdentifierType.Card && (
                            <Status contentKey="card" variant="info" icon={<Card size={20} />} />
                        )}

                        {_.type === E_IdentifierType.Tag && (
                            <Status contentKey="tag" variant="warning" icon={<Money size={20} />} />
                        )}

                        <div className="flex flex-col min-w-72">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Text variant="meta-1" contentKey="identifier_number" ns="input" />
                                    <Text variant="meta-1" content=":" />
                                </div>

                                <Text variant="meta-1" content={_.number} className="font-courier" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Text variant="meta-1" contentKey="serial" ns="input" />
                                    <Text variant="meta-1" content=":" />
                                </div>

                                <Text variant="meta-1" content={_.serial} className="font-courier" />
                            </div>
                        </div>
                    </div>
                ))}

            {hasVehicles && <Divider className="mb-4" />}

            {hasVehicles &&
                owner.vehicles?.map(_ => (
                    <div className="flex items-start justify-between mb-4">
                        {!_.image_url && <Status contentKey="vehicle" variant="success" icon={<Car size={20} />} />}

                        {_.image_url && (
                            <Link to={_.image_url} target="_blank">
                                <Status contentKey="vehicle" variant="success" icon={<Car size={20} />} />
                            </Link>
                        )}

                        <div className="flex flex-col min-w-72">
                            {_.model && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Text variant="meta-1" contentKey="model" ns="input" />
                                        <Text variant="meta-1" content=":" />
                                    </div>

                                    <Text variant="meta-1" content={_.model} />
                                </div>
                            )}

                            {_.color && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Text variant="meta-1" contentKey="color" ns="input" />
                                        <Text variant="meta-1" content=":" />
                                    </div>

                                    <Text variant="meta-1" content={_.color} />
                                </div>
                            )}

                            {_.manufacture_year && (
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <Text variant="meta-1" contentKey="manufacture_year" ns="input" />
                                        <Text variant="meta-1" content=":" />
                                    </div>

                                    <Text variant="meta-1" content={_.manufacture_year} />
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Text variant="meta-1" contentKey="plate" ns="input" />
                                    <Text variant="meta-1" content=":" />
                                </div>

                                <IranLicensePlate serial={_.plate_number} className="w-20" />
                            </div>
                        </div>
                    </div>
                ))}
        </Modal>
    )
}
