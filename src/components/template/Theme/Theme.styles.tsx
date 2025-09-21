/** @jsxImportSource @emotion/react */
import type { SerializedStyles } from "@emotion/react"
import { css } from "@emotion/react"

import { ButtonStyles } from "./Theme.static"
import type { T_ButtonVariant, T_FontTuple } from "./Theme.types"

export const generateButtonStyles = (variant: T_ButtonVariant): SerializedStyles => {
    const style = ButtonStyles[variant]

    return css`
        background-color: ${style.bgColor};
        color: ${style.textColor} !important;
        border-radius: ${style.borderRadius}px;
        border-color: ${style.borderColor};
        fill: ${style.hover.bgColor} !important;

        &:hover {
            background-color: ${style.hover.bgColor};
            color: ${style.hover.textColor} !important;
            border-color: ${style.hover.borderColor};
        }
        &:disabled {
            background-color: ${style.disabled.bgColor};
            color: ${style.disabled.textColor} !important;
            border-color: ${style.disabled.borderColor};
            fill: ${style.disabled.bgColor} !important;
        }
    `
}

// Note: Please consider that the text-[${base[0]}px] is not going to work with tailwind. It's just
// a limitation with tailwind and because of that, here we switched to the generation as old school styles,
// and again to make it work better, we added @emotion to the project!
export const generateTextStyles = (args: { base: T_FontTuple; sm: T_FontTuple; xl: T_FontTuple }): SerializedStyles => {
    const { base, sm, xl } = args

    return css`
        font-size: ${base[0]}px;
        line-height: ${base[1]}px;

        @media (min-width: 640px) {
            font-size: ${sm[0]}px;
            line-height: ${sm[1]}px;
        }

        @media (min-width: 1280px) {
            font-size: ${xl[0]}px;
            line-height: ${xl[1]}px;
        }
    `
}
