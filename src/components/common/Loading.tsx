/* eslint-disable react/jsx-no-useless-fragment */
import { Animations } from "@core/assets"
import type { FC } from "react"
import Lottie from "react-lottie"

interface I_Element {}
const Element: FC<I_Element> = () => {
    // States and hooks
    const defaultOptions = {
        loop: true,
        autoplay: true,
    }

    // Render
    return (
        <div className="w-32">
            <Lottie
                options={{
                    ...defaultOptions,
                    animationData: Animations.Loading,
                }}
            />
        </div>
    )
}

interface I_Screen {}
const Screen: FC<I_Screen> = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <Element />
        </div>
    )
}

interface I_Loading {
    Element: FC<I_Element>
    Screen: FC<I_Screen>
}

export const Loading: I_Loading = () => {
    return <></>
}

Loading.Element = Element
Loading.Screen = Screen
