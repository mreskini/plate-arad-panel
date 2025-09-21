import type { T_ButtonStyle, T_ButtonVariant, T_Typography } from "./Theme.types"

export const Typography: T_Typography = {
    // Typography configs.
    headings: [
        { base: [48, 60], sm: [60, 72], xl: [72, 90] }, // heading-1
        { base: [36, 44], sm: [48, 60], xl: [60, 72] }, // heading-2
        { base: [30, 38], sm: [36, 44], xl: [48, 60] }, // heading-3
        { base: [24, 32], sm: [30, 38], xl: [36, 44] }, // heading-4
        { base: [24, 32], sm: [24, 32], xl: [30, 38] }, // heading-5
        { base: [20, 30], sm: [20, 30], xl: [24, 32] }, // heading-6
    ],
    titles: [
        { base: [20, 30], sm: [20, 30], xl: [20, 30] }, // title-1
        { base: [18, 28], sm: [18, 28], xl: [18, 28] }, // title-2
    ],
    body: { base: [16, 24], sm: [16, 24], xl: [16, 24] },
    meta: [
        { base: [14, 20], sm: [14, 20], xl: [14, 20] }, // meta-1
        { base: [14, 20], sm: [14, 20], xl: [12, 18] }, // meta-2
    ],
    button: { base: [16, 18], sm: [16, 18], xl: [16, 18] },
}

export const ButtonStyles: { [key in T_ButtonVariant]: T_ButtonStyle } = {
    primary: {
        bgColor: "var(--color-button-primary-bg)",
        borderColor: "var(--color-button-primary-border)",
        borderRadius: 6,
        textColor: "var(--color-button-primary-text)",
        hover: {
            bgColor: "var(--color-button-primary-bg-hover)",
            borderColor: "var(--color-button-primary-border-hover)",
            textColor: "var(--color-button-primary-text-hover)",
        },
        disabled: {
            bgColor: "var(--color-button-primary-bg-disabled)",
            borderColor: "var(--color-button-primary-border-disabled)",
            textColor: "var(--color-button-primary-text-disabled)",
        },
    },

    "primary-pill": {
        bgColor: "var(--color-button-primary-bg)",
        borderColor: "var(--color-button-primary-border)",
        borderRadius: 100,
        textColor: "var(--color-button-primary-text)",
        hover: {
            bgColor: "var(--color-button-primary-bg-hover)",
            borderColor: "var(--color-button-primary-border-hover)",
            textColor: "var(--color-button-primary-text-hover)",
        },
        disabled: {
            bgColor: "var(--color-button-primary-bg-disabled)",
            borderColor: "var(--color-button-primary-border-disabled)",
            textColor: "var(--color-button-primary-text-disabled)",
        },
    },

    "primary-outline": {
        bgColor: "transparent",
        borderColor: "var(--color-button-primary-border)",
        borderRadius: 6,
        textColor: "var(--color-button-primary-outline-text)",
        hover: {
            bgColor: "var(--color-button-primary-bg-hover)",
            borderColor: "var(--color-button-primary-border-hover)",
            textColor: "var(--color-button-primary-text-hover)",
        },
        disabled: {
            bgColor: "transparent",
            borderColor: "var(--color-button-primary-border-disabled)",
            textColor: "var(--color-button-primary-text-outline-disabled)",
        },
    },
    "gray-outline": {
        bgColor: "transparent",
        borderColor: "var(--color-button-gray-border)",
        borderRadius: 6,
        textColor: "var(--color-button-gray-outline-text)",
        hover: {
            bgColor: "transparent",
            borderColor: "var(--color-button-gray-border-hover)",
            textColor: "var(--color-button-gray-text-hover)",
        },
        disabled: {
            bgColor: "transparent",
            borderColor: "var(--color-button-gray-border-disabled)",
            textColor: "var(--color-button-gray-text-outline-disabled)",
        },
    },

    red: {
        bgColor: "var(--color-button-red-bg)",
        borderColor: "var(--color-button-red-border)",
        borderRadius: 6,
        textColor: "var(--color-button-red-text)",
        hover: {
            bgColor: "var(--color-button-red-bg-hover)",
            borderColor: "var(--color-button-red-border-hover)",
            textColor: "var(--color-button-red-text-hover)",
        },
        disabled: {
            bgColor: "var(--color-button-red-bg-disabled)",
            borderColor: "var(--color-button-red-border-disabled)",
            textColor: "var(--color-button-red-text-disabled)",
        },
    },

    "red-outline": {
        bgColor: "transparent",
        borderColor: "var(--color-button-red-border)",
        borderRadius: 6,
        textColor: "var(--color-button-red-outline-text)",
        hover: {
            bgColor: "var(--color-button-red-bg-hover)",
            borderColor: "var(--color-button-red-border-hover)",
            textColor: "var(--color-button-red-text-hover)",
        },
        disabled: {
            bgColor: "transparent",
            borderColor: "var(--color-button-red-border-disabled)",
            textColor: "var(--color-button-red-text-outline-disabled)",
        },
    },

    white: {
        bgColor: "var(--color-button-white-bg)",
        borderColor: "var(--color-button-white-border)",
        borderRadius: 6,
        textColor: "var(--color-button-white-text)",
        hover: {
            bgColor: "var(--color-button-white-bg-hover)",
            borderColor: "var(--color-button-white-border-hover)",
            textColor: "var(--color-button-white-text-hover)",
        },
        disabled: {
            bgColor: "var(--color-button-white-bg-disabled)",
            borderColor: "var(--color-button-white-border-disabled)",
            textColor: "var(--color-button-white-text-disabled)",
        },
    },

    ghost: {
        bgColor: "transparent",
        borderColor: "transparent",
        borderRadius: 0,
        textColor: "var(--color-button-ghost-text)",
        hover: {
            bgColor: "transparent",
            borderColor: "transparent",
            textColor: "var(--color-button-ghost-text-hover)",
        },
        disabled: {
            bgColor: "transparent",
            borderColor: "transparent",
            textColor: "var(--color-button-ghost-text-disabled)",
        },
    },
}
