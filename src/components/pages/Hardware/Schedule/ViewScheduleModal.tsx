import { Button, Modal, Text } from "@components/template"
import type { T_Schedule } from "@core/api"
import { formatDate, formatTime } from "@core/functions"
import { useModal } from "@core/stores"
import { Modals } from "@core/utilities"
import { type FC } from "react"

import { WeekDaysView } from "./WeekDaysView"

interface I_Props {
    schedule: T_Schedule
}

const CurrentModal = Modals.Access.Schedule.View

export const ViewScheduleModal: FC<I_Props> = ({ schedule }) => {
    // States and hooks
    const { closeModal } = useModal()

    // Render
    return (
        <Modal
            name={CurrentModal}
            title={<Text content={schedule.title} variant="title-1" className="text-neutral-700" weight={600} />}
            closeButton
        >
            <div className="sm:min-w-xl flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <Text contentKey="start_date" ns="input" className="min-w-32" />
                    <Text content={formatDate(new Date(schedule.start_date))} />
                </div>

                {schedule.end_date && (
                    <div className="flex items-center justify-between">
                        <Text contentKey="end_date" ns="input" className="min-w-32" />
                        <Text content={formatDate(new Date(schedule.end_date))} />
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <Text contentKey="start_time" ns="input" className="min-w-32" />
                    <Text content={formatTime(schedule.start_time)} />
                </div>

                <div className="flex items-center justify-between">
                    <Text contentKey="end_time" ns="input" className="min-w-32" />
                    <Text content={formatTime(schedule.end_time)} />
                </div>

                <div className="flex items-center justify-between">
                    <Text contentKey="traffic_days" ns="input" className="min-w-32" />
                    <WeekDaysView selected={schedule.allowed_days} className="w-full" />
                </div>

                <div>
                    <Button
                        contentKey="close"
                        variant="gray-outline"
                        onClick={() => closeModal(CurrentModal)}
                        className="w-full"
                    />
                </div>
            </div>
        </Modal>
    )
}
