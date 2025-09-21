import type { SerializedStyles } from "@emotion/react"

import { generateButtonStyles, type T_ButtonVariant } from "../Theme"

export const ButtonVariants: { [key in T_ButtonVariant]: SerializedStyles } = {
    primary: generateButtonStyles("primary"),
    "primary-pill": generateButtonStyles("primary-pill"),
    red: generateButtonStyles("red"),
    "primary-outline": generateButtonStyles("primary-outline"),
    "red-outline": generateButtonStyles("red-outline"),
    white: generateButtonStyles("white"),
    ghost: generateButtonStyles("ghost"),
    "gray-outline": generateButtonStyles("gray-outline"),
}
