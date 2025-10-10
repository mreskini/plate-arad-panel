import { Input, Modal, Text } from "@components/template"
import { Modals } from "@core/utilities"
import { type FC, useState } from "react"

import { AddCardGroupMethod } from "./AddCardGroupMethod"
import { AddCardSingleMethod } from "./AddCardSingleMethod"

interface I_Props {
    callback: Function
}

enum E_OperationType {
    Single = "Single",
    Group = "Group",
}

const CurrentModal = Modals.Management.Card.AddCard

export const AddCardModal: FC<I_Props> = ({ callback }) => {
    // States and hooks
    const [operationType, setOperationType] = useState<E_OperationType>(E_OperationType.Single)

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text contentKey="add_card" variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <div className="flex w-full items-center gap-4 mb-4">
                <Input.Label labelKey="add_type" className="grow" />
                <Input.DropDown
                    options={[
                        {
                            value: E_OperationType.Single,
                            labelKey: "single",
                        },
                        {
                            value: E_OperationType.Group,
                            labelKey: "group",
                        },
                    ]}
                    value={operationType}
                    setValue={(_: string) => setOperationType(_ as E_OperationType)}
                    wrapperClassName="max-w-lg"
                />
            </div>

            {operationType === E_OperationType.Single && <AddCardSingleMethod callback={callback} />}
            {operationType === E_OperationType.Group && <AddCardGroupMethod callback={callback} />}
        </Modal>
    )
}
