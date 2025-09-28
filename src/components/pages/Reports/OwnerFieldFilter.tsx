import type { T_InputDropdownOption } from "@components/template"
import { Input } from "@components/template"
import { useCommon } from "@core/contexts"
import { type FC, useEffect, useState } from "react"

export interface I_OwnerFieldFilter {
    ownerToken: string
    setOwnerToken: Function
    isFetching: boolean
}

export const OwnerFieldFilter: FC<I_OwnerFieldFilter> = ({ ownerToken, setOwnerToken, isFetching }) => {
    // States and hooks
    const { onOwnerSearch } = useCommon()
    const [initialOwners, setInitialOwners] = useState<T_InputDropdownOption[]>([])

    // Use effects
    useEffect(() => {
        onOwnerSearch("").then(_ => setInitialOwners(_))
    }, [])

    // Render
    return (
        <Input.DropDown
            options={initialOwners}
            value={ownerToken}
            setValue={(_: string) => setOwnerToken(_)}
            disabled={isFetching}
            placeholder="please_search_owner_fullname"
            onSearch={onOwnerSearch}
            clearable
        />
    )
}
