import { Status } from "@components/common"
import { Divider, Input, Modal, Text } from "@components/template"
import type { T_Customer } from "@core/api"
import { formatNationalCode, formatPhoneNumber } from "@core/functions"
import { Modals } from "@core/utilities"
import { Car, Card, Money } from "iconsax-reactjs"
import IranLicensePlate from "iran-license-plate"
import { type FC } from "react"

interface I_Props {
    owner: T_Customer
}

const CurrentModal = Modals.Owner.View

export const ViewOwnerModal: FC<I_Props> = ({ owner }) => {
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

            <Divider className="mb-4" />

            <div className="flex items-start justify-between mb-4">
                <Status contentKey="card" variant="info" icon={<Card size={20} />} />

                <div className="flex flex-col min-w-72">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="identifier_number" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="1231231231" className="font-courier" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="serial" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="1231231231" className="font-courier" />
                    </div>
                </div>
            </div>

            <Divider className="mb-4" />

            <div className="flex items-start justify-between mb-4">
                <Status contentKey="tag" variant="warning" icon={<Money size={20} />} />

                <div className="flex flex-col min-w-72">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="identifier_number" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="1231231231" className="font-courier" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="serial" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="1231231231" className="font-courier" />
                    </div>
                </div>
            </div>

            <Divider className="mb-4" />

            <div className="flex items-start justify-between mb-4">
                <Status contentKey="vehicle" variant="success" icon={<Car size={20} />} />

                <div className="flex flex-col min-w-72">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="model" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="پژو ۲۰۶" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="color" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="سفید" />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="plate" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <IranLicensePlate serial="IR60-321b12" className="w-20" />
                    </div>
                </div>
            </div>

            <Divider className="mb-4" />

            <div className="flex items-start justify-between mb-4">
                <Status contentKey="vehicle" variant="success" icon={<Car size={20} />} />

                <div className="flex flex-col min-w-72">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="model" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="پژو ۲۰۶" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="color" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="سفید" />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="plate" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <IranLicensePlate serial="IR60-321b12" className="w-20" />
                    </div>
                </div>
            </div>

            <Divider className="mb-4" />

            <div className="flex items-start justify-between mb-4">
                <Status contentKey="vehicle" variant="success" icon={<Car size={20} />} />

                <div className="flex flex-col min-w-72">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="model" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="پژو ۲۰۶" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="color" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <Text variant="meta-1" content="سفید" />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                            <Text variant="meta-1" contentKey="plate" ns="input" />
                            <Text variant="meta-1" content=":" />
                        </div>

                        <IranLicensePlate serial="IR60-321b12" className="w-20" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
