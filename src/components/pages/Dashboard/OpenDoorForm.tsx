import { Button, Input, Spinner, Text } from "@components/template"
import type { T_Door } from "@core/api"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_OpenDoorFormData) => Promise<void>
    onClose: Function
    door: T_Door
}

export interface I_OpenDoorFormData {
    token: string
    name: string
    descriptions: string
}

export const OpenDoorForm: FC<I_Props> = ({ onSubmit, onClose, door }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)

    const {
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<I_OpenDoorFormData>({
        mode: "onChange",
        defaultValues: {
            token: door.token,
            name: door.name,
            descriptions: "",
        },
    })

    // Flags
    const isValid = watch("descriptions").length >= 3

    // Methods
    const init = async () => {
        setIsFetching(false)
    }

    useEffect(() => {
        init()
    }, [])

    // Render
    return (
        <>
            {isFetching && (
                <div className="sm:min-w-xl flex items-center justify-center py-10">
                    <Spinner />
                </div>
            )}

            {!isFetching && (
                <form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-xl">
                    <div className="flex items-center gap-1 mb-4">
                        <Text contentKey="are_you_sure_you_want_to_open_door" values={[door.name]} weight={300} />
                    </div>

                    <div className="flex w-full items-start gap-2 mb-4">
                        <Input.Label labelKey="reason" className="min-w-24" required />
                        <Input.Textarea
                            placeholder="enter_reason"
                            defaultValue={getValues("descriptions")}
                            onChange={e => setValue("descriptions", e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey="open"
                            variant="red-outline"
                            type="submit"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
                        />

                        <Button
                            contentKey="cancel"
                            variant="gray-outline"
                            onClick={() => onClose()}
                            className="w-full"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            )}
        </>
    )
}
