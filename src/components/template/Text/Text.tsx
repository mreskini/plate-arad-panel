/* eslint-disable @typescript-eslint/naming-convention */
/** @jsxImportSource @emotion/react */

import { formatNumber } from "@core/functions"
import styled from "@emotion/styled"
import type { FlatNamespace, KeysWithoutReturnObjects } from "i18next"
import i18next from "i18next"
import type { FC } from "react"
import { useTranslation } from "react-i18next"

import type { T_Variant, T_Weight } from "../Theme"
import { TextVariants, TextWeights } from "./Text.static"

export interface I_Text {
    variant?: T_Variant
    weight?: T_Weight
    className?: string
    contentKey?: KeysWithoutReturnObjects[FlatNamespace]
    content?: string | number
    values?: (string | number)[]
    ns?: FlatNamespace
}

export const Text: FC<I_Text> = ({
    variant = "body",
    weight = 400,
    className,
    contentKey,
    content = "",
    values,
    ns = "common",
}) => {
    // States and Hooks
    const { t } = useTranslation(ns)

    const StyledText = styled.span<{ variant: T_Variant }>`
        ${props => TextVariants[props.variant]}
    `

    // Render
    return (
        <StyledText variant={variant} className={`${TextWeights[weight]} ${className}`}>
            {contentKey && t(contentKey, { ...values })}
            {typeof content === "number" && formatNumber(content, i18next.language)}
            {typeof content === "string" && content}
        </StyledText>
    )
}
