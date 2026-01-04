/* eslint-disable jsx-a11y/tabindex-no-positive */
import clsx from "clsx"
import { CloseCircle } from "iconsax-reactjs"
import type { FC } from "react"
import { useEffect, useRef, useState } from "react"

import { Button } from "../Button"
import { Text } from "../Text"
import type { I_PlateNumber } from "./Input.types"
import { MinimalDropDown } from "./MinimalDropDown"
import { IranPlateNumberLetterOptions } from "./static"

export const PlateNumber: FC<I_PlateNumber> = ({
    wrapperClassName,
    setValue = () => {},
    initialValue,
    clearable = false,
    ...rest
}) => {
    // States and hooks
    const { disabled } = rest
    const [firstPart, setFirstPart] = useState<string>("")
    const [secondPart, setSecondPart] = useState<string>("")
    const [thirdPart, setThirdPart] = useState<string>("")
    const [fourthPart, setFourthPart] = useState<string>("")

    const firstPartRef = useRef<HTMLInputElement>(null)
    const secondPartRef = useRef<HTMLInputElement>(null)
    const thirdPartRef = useRef<HTMLInputElement>(null)
    const fourthPartRef = useRef<HTMLInputElement>(null)

    const isClearButtonAvailable = clearable && (firstPart || thirdPart || fourthPart)

    // Parse initial value
    useEffect(() => {
        if (!initialValue) return

        // Expected format: IR00-000b00
        const parts = initialValue.split("-")
        if (parts.length === 2) {
            // Parse IR part (first 2 digits after IR)
            const irPart = parts[0].substring(2) // Remove "IR"
            setFourthPart(irPart)

            // Parse remaining parts (000b00)
            const remaining = parts[1]
            if (remaining.length >= 5) {
                setFirstPart(remaining.substring(4)) // Last 2 digits
                setSecondPart(remaining.substring(3, 4)) // Letter
                setThirdPart(remaining.substring(0, 3)) // First 3 digits
            }
        }
    }, [])

    // Methods
    const onChangeHandler = () => {
        if (firstPart && secondPart && thirdPart && fourthPart) {
            const plateNumber = `IR${fourthPart}-${thirdPart}${secondPart}${firstPart}`
            setValue(plateNumber)
        } else {
            setValue("")
        }
    }

    const handleFirstPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 2)
        setFirstPart(value)
        if (value.length === 2) secondPartRef.current?.focus()
    }

    const handleThirdPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 3)
        setThirdPart(value)
        if (value.length === 3) fourthPartRef.current?.focus()
    }

    const handleFourthPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 2)
        setFourthPart(value)
    }

    const handleFirstPartKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && firstPart.length === 0) {
            // Move focus to previous element if needed
        }
    }

    const handleThirdPartKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && thirdPart.length === 0) secondPartRef.current?.focus()
    }

    const handleFourthPartKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && fourthPart.length === 0) thirdPartRef.current?.focus()
    }

    const handleLetterSelect = (option: string) => {
        setSecondPart(option)
        thirdPartRef.current?.focus()
        onChangeHandler()
    }

    const clearPlateSerial = () => {
        setFirstPart("")
        setThirdPart("")
        setFourthPart("")
    }

    // Use effects
    useEffect(() => {
        onChangeHandler()
    }, [firstPart, secondPart, thirdPart, fourthPart])

    // Handle tab navigation to open dropdown
    const handleFirstPartTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault()
        }
    }

    // Render
    return (
        <div className={clsx([wrapperClassName, "flex items-center gap-1.5"])}>
            {/* Part 4 - IR and 2 digits */}
            <div className="flex flex-col border border-neutral-300 rounded-md w-12 h-10 text-center">
                <div
                    className={clsx([
                        "border-b border-neutral-300",
                        disabled && "disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500",
                    ])}
                >
                    <Text variant="meta-1" contentKey="iran" ns="input" className="block text-[12px] leading-[14px]" />
                </div>

                <div className="flex items-center grow">
                    <input
                        ref={fourthPartRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="text-center plate-number-input w-full text-sm font-light text-neutral-800 outline-none focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                        disabled={disabled}
                        maxLength={2}
                        value={fourthPart}
                        onChange={handleFourthPartChange}
                        onKeyDown={handleFourthPartKeyDown}
                        tabIndex={4}
                    />
                </div>
            </div>

            {/* Part 3 - 3 digits */}
            <div className="w-16 flex items-center justify-center">
                <input
                    ref={thirdPartRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="border plate-number-input border-neutral-300 rounded-md text-center h-10 w-full px-2 text-base font-light text-neutral-800 outline-none focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                    disabled={disabled}
                    maxLength={3}
                    value={thirdPart}
                    onChange={handleThirdPartChange}
                    onKeyDown={handleThirdPartKeyDown}
                    tabIndex={3}
                />
            </div>

            {/* Part 2 - Letters dropdown */}
            <div className="w-16 h-10 relative">
                <MinimalDropDown
                    ref={secondPartRef}
                    options={IranPlateNumberLetterOptions}
                    setValue={handleLetterSelect}
                    value={secondPart}
                    disabled={disabled}
                    tabIndex={2}
                />
            </div>

            {/* Part 1 - 2 digits */}
            <div className="w-12 flex items-center justify-center">
                <input
                    ref={firstPartRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="border plate-number-input border-neutral-300 rounded-md text-center w-full h-10 px-2 text-base font-light text-neutral-800 outline-none focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500"
                    disabled={disabled}
                    maxLength={2}
                    value={firstPart}
                    onChange={handleFirstPartChange}
                    onKeyDown={handleFirstPartKeyDown}
                    onKeyUp={handleFirstPartTab}
                    tabIndex={1}
                />
            </div>

            {/* Clear button */}
            {/* TODO: Clear button have to clear the letter section */}
            {isClearButtonAvailable && (
                <Button variant="ghost" onClick={clearPlateSerial}>
                    <CloseCircle className="text-red-500 size-5" />
                </Button>
            )}
        </div>
    )
}
