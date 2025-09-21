import type { SerializedStyles } from "@emotion/react"

import type { T_Variant, T_Weight } from "../Theme"
import { generateTextStyles, Typography } from "../Theme"

export const TextVariants: { [key in T_Variant]: SerializedStyles } = {
    "heading-1": generateTextStyles(Typography.headings[0]),
    "heading-2": generateTextStyles(Typography.headings[1]),
    "heading-3": generateTextStyles(Typography.headings[2]),
    "heading-4": generateTextStyles(Typography.headings[3]),
    "heading-5": generateTextStyles(Typography.headings[4]),
    "heading-6": generateTextStyles(Typography.headings[5]),
    "title-1": generateTextStyles(Typography.titles[0]),
    "title-2": generateTextStyles(Typography.titles[1]),
    body: generateTextStyles(Typography.body),
    "meta-1": generateTextStyles(Typography.meta[0]),
    "meta-2": generateTextStyles(Typography.meta[1]),
    button: generateTextStyles(Typography.button),
}

export const TextWeights: { [key in T_Weight]: string } = {
    100: "font-thin",
    200: "font-extralight",
    300: "font-light",
    400: "font-normal",
    500: "font-medium",
    600: "font-semibold",
    700: "font-bold",
    800: "font-extrabold",
    900: "font-black",
}
