import { Layout } from "@components/layout"
import { Button, Input, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { useCommon } from "@core/contexts"
import { useApp } from "@core/stores"
import type { FormEvent } from "react"
import { useEffect, useState } from "react"

export const Configuration = () => {
    // States and hooks
    const { parking } = useApp()
    const { notify } = useNotify()
    const { fetchParkingInfo } = useCommon()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tagCacheTime, setTagCacheTime] = useState<number>(0)
    const [plateCacheTime, setPlateCacheTime] = useState<number>(0)

    // Methods
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const { data, error } = await API.Parking.UpdateParkingInfo({
            body: {
                tag_cache_time_in_seconds: tagCacheTime,
                plate_cache_time_in_seconds: plateCacheTime,
            },
        })

        if (data && data.updateParkingInfo) {
            notify("configuration_updated_successfully", "success")
            await fetchParkingInfo()
        } else if (error) notify("configuration_update_failed", "error")

        setIsSubmitting(false)
    }

    // Use effects
    useEffect(() => {
        if (parking) {
            setTagCacheTime(parking.tag_cache_time_in_seconds || 0)
            setPlateCacheTime(parking.plate_cache_time_in_seconds || 0)
        }
    }, [parking])

    // Render
    return (
        <Layout.Dashboard>
            <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 p-4">
                <div className="mb-4">
                    <Text className="text-blue-500" weight={700} variant="heading-6" contentKey="configuration" />
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-4 border border-neutral-200 rounded-xl p-4">
                        <div className="flex items-center gap-4">
                            <Input.Label labelKey="tag_cache_time_in_seconds" className="min-w-52" />
                            <Input.Number
                                value={tagCacheTime}
                                onChange={e => setTagCacheTime(Number(e.target.value) || 0)}
                                placeholder="enter_value"
                                className="min-w-64"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Input.Label labelKey="plate_cache_time_in_seconds" className="min-w-52" />
                            <Input.Number
                                value={plateCacheTime}
                                setValue={value => setPlateCacheTime(value)}
                                placeholder="enter_value"
                                className="min-w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-end">
                    <Button
                        type="submit"
                        contentKey="save"
                        className="mt-4"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </Layout.Dashboard>
    )
}
