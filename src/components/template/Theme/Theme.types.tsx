export type T_Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export type T_Variant =
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "heading-4"
    | "heading-5"
    | "heading-6"
    | "title-1"
    | "title-2"
    | "body"
    | "meta-1"
    | "meta-2"
    | "button"

export type T_Language = "fa"

// Note: Each font has two numbers, the first one is for the text size and the other one is for the line height.
// To keep it simple, and to code less, this policy is set.
export type T_FontTuple = [number, number]

export type T_Font = { base: T_FontTuple; sm: T_FontTuple; xl: T_FontTuple }

export type T_Typography = {
    headings: T_Font[]
    titles: T_Font[]
    body: T_Font
    meta: T_Font[]
    button: T_Font
}

export type T_ButtonVariant =
    | "primary"
    | "primary-pill"
    | "red"
    | "primary-outline"
    | "red-outline"
    | "white"
    | "ghost"
    | "gray-outline"

export type T_ButtonSize = "base" | "sm"

export type T_ButtonStyle = {
    borderRadius: number
    borderColor: string
    bgColor: string
    textColor: string
    hover: {
        bgColor: string
        textColor: string
        borderColor: string
    }
    disabled: {
        bgColor: string
        borderColor: string
        textColor: string
    }
}

export type T_SpinnerVariant = "primary" | "light" | "disabled"
