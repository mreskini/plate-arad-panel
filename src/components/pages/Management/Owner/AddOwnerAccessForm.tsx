import type { T_InputDropdownOption } from "@components/template"
import { Button, Input, Spinner } from "@components/template"
import { API } from "@core/api"
import { type FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface I_Props {
    onSubmit: (data: I_AddOwnerAccessFormData) => Promise<void>
    onClose: Function
}

export interface I_AddOwnerAccessFormData {
    accessControlToken: string
}

export const AddOwnerAccessForm: FC<I_Props> = ({ onSubmit, onClose }) => {
    // States and hooks
    const [isFetching, setIsFetching] = useState(true)
    const [accessControlOptions, setAccessControlOptions] = useState<T_InputDropdownOption[]>([])

    const {
        handleSubmit,
        setValue,
        getValues,
        formState: { isSubmitting },
    } = useForm<I_AddOwnerAccessFormData>({
        mode: "onChange",
    })

    // Methods
    const init = async () => {
        fetchAccessControlOptions()
        setIsFetching(false)
    }

    const fetchAccessControlOptions = async () => {
        const { data } = await API.Client.FetchFlatAccessControls()
        if (data?.fetchAccessControls) {
            setAccessControlOptions(
                data.fetchAccessControls.map(_ => ({ value: _.token, label: `${_.title} (${_.schedule.title})` }))
            )
        }
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
                    <div className="flex w-full items-center gap-4 mb-4">
                        <Input.Label labelKey="id_type" className="min-w-24" />
                        <Input.DropDown
                            options={accessControlOptions}
                            value={getValues("accessControlToken")}
                            setValue={(_: string) => setValue("accessControlToken", _ as string)}
                            wrapperClassName="max-w-xl"
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            contentKey="apply"
                            type="submit"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting}
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
