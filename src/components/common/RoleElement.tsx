import { Text } from "@components/template"
import type { FC } from "react"

interface I_Props {
    role: string
}

export const RoleElement: FC<I_Props> = ({ role }) => {
    // Render
    return (
        <div className="px-3 py-2 rounded-md border border-blue-600">
            <Text content={role} variant="meta-2" className="text-zinc-950" />
        </div>
    )
}
