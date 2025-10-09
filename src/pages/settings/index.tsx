import { Layout } from "@components/layout"
import { SettingsWrapper } from "@components/pages/Settings"
import { Button, Input } from "@components/template"
import { formatNumber } from "@core/functions"

export const Settings = () => {
    return (
        <Layout.Dashboard>
            <SettingsWrapper title="settings">
                <div className="w-full flex gap-4">
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl p-4">
                            <Input.Checkbox labelKey="prevent_submission_of_similar_plate" checked />

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="minimum_difference_between_two_adjacent_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="how_many_minutes_is_permitted_to_submit_similar_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl p-4">
                            <Input.Checkbox labelKey="prevent_submission_of_similar_plate" checked />
                            <Input.Checkbox labelKey="compare_only_to_last_plate" checked />

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="minimum_difference_between_two_adjacent_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="how_many_minutes_is_permitted_to_submit_similar_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl p-4">
                            <Input.Checkbox labelKey="prevent_submission_of_similar_plate" checked />
                            <Input.Checkbox labelKey="compare_only_to_last_plate" checked />

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="minimum_difference_between_two_adjacent_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="how_many_minutes_is_permitted_to_submit_similar_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl p-4">
                            <Input.Checkbox labelKey="prevent_submission_of_similar_plate" checked />

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="minimum_difference_between_two_adjacent_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>

                            <div className="flex items-center gap-4 justify-between">
                                <Input.Label labelKey="how_many_minutes_is_permitted_to_submit_similar_plates" />
                                <Input value={formatNumber(2)} placeholder="enter_value" className="w-20" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-end">
                    <Button contentKey="save" className="mt-4" />
                </div>
            </SettingsWrapper>
        </Layout.Dashboard>
    )
}
