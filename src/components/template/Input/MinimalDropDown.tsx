import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown2 } from "iconsax-reactjs"
import { find } from "lodash"
import type { FC } from "react"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { Text } from "../Text"
import type { I_MinimalDropDown, T_MinimalDropdownOption } from "./Input.types"

export const MinimalDropDown: FC<I_MinimalDropDown> = ({
    ref,
    value,
    setValue = () => {},
    icon,
    options,
    disabled,
    loading = false,
    wrapperClassName = "",
    autoFocus = false,
    ...rest
}) => {
    // States and hooks
    const { className, tabIndex } = rest
    const [showMenu, setShowMenu] = useState(false)
    const [selectedOption, setSelectedOption] = useState<T_MinimalDropdownOption | undefined>(
        find(options, { value }) || undefined
    )
    const [searchValue, setSearchValue] = useState("")
    const [filteredOptions, setFilteredOptions] = useState(options)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation("letters")

    const isFilteredOptionsAvailable = filteredOptions.length > 0

    // Methods
    const optionClickHandler = (option: T_MinimalDropdownOption) => {
        setValue(option.value)
        setSelectedOption(option)
        setSearchValue("")
        setShowMenu(false)
        setFilteredOptions(options) // Reset filtered options after selection
    }

    const toggleMenu = () => {
        if (loading) return
        inputRef.current?.focus()
        setShowMenu(prev => !prev)
        if (!showMenu) {
            setSearchValue("")
            setFilteredOptions(options)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        setSearchValue(searchTerm)

        // Filter options based on search term
        if (searchTerm) {
            const filtered = options.filter(option => {
                const label = t(option.labelKey!)
                return label.toLowerCase().includes(searchTerm.toLowerCase())
            })
            setFilteredOptions(filtered)
        } else {
            setFilteredOptions(options)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowMenu(false)
                setSearchValue("")
                setFilteredOptions(options)
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showMenu, options])

    useEffect(() => {
        if (showMenu) inputRef.current?.focus()
        if (!showMenu) inputRef.current?.blur()
    }, [showMenu])

    useEffect(() => {
        if (autoFocus) {
            inputRef.current?.focus()
            setShowMenu(true)
        }
    }, [autoFocus])

    useEffect(() => {
        const option = find(options, { value })
        if (option) setSelectedOption(option)
    }, [value])

    // Render
    return (
        <div ref={dropdownRef} className={clsx(["relative flex items-center h-full w-full", wrapperClassName])}>
            <input
                ref={ref}
                type="text"
                className={clsx([
                    className,
                    "peer w-full h-10 cursor-pointer rounded-md border border-solid border-neutral-300 bg-white px-2 py-1 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-neutral-300",
                    showMenu ? "caret-auto" : "caret-transparent",
                ])}
                value={showMenu ? searchValue : t(selectedOption?.labelKey!) || ""}
                onClick={toggleMenu}
                onChange={showMenu ? handleSearchChange : () => {}}
                disabled={disabled || loading}
                tabIndex={tabIndex}
            />

            <button
                className="absolute inset-y-0 right-2 mb-0 flex cursor-pointer items-center text-neutral-400 peer-focus:text-blue-500"
                type="button"
                onClick={toggleMenu}
            >
                {icon}
            </button>

            <motion.button
                className={clsx([
                    "absolute inset-y-0 left-2 z-10 cursor-pointer text-neutral-400 peer-focus:text-blue-500",
                    showMenu ? "text-blue-500" : "text-neutral-400",
                ])}
                type="button"
                animate={{ rotate: showMenu ? 180 : 0, transformOrigin: "center" }}
                transition={{ duration: 0.15 }}
                onClick={toggleMenu}
            >
                <ArrowDown2 size={16} className="text-neutral-300" />
            </motion.button>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        className={clsx([
                            "absolute -bottom-2 z-50 flex max-h-60 w-full border border-neutral-300 translate-y-full flex-col overflow-y-auto rounded-md bg-white",
                        ])}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={{
                            open: {
                                height: "auto",
                                transition: { duration: 0.2 },
                            },
                            closed: {
                                height: 0,
                                transition: { duration: 0.2 },
                            },
                        }}
                    >
                        {isFilteredOptionsAvailable ? (
                            filteredOptions.map((_, index) => {
                                const isSelected = selectedOption?.labelKey === _.labelKey
                                const animationDelay = 0.05 * index

                                return (
                                    <motion.button
                                        key={_.labelKey}
                                        className="flex cursor-pointer items-center gap-3 border-0 border-b border-solid border-zinc-200 px-4 py-2 last:border-b-0"
                                        type="button"
                                        onClick={() => optionClickHandler(_)}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                transition: { duration: 0.5 },
                                            },
                                            closed: {
                                                opacity: 0,
                                                transition: { duration: 0.1 },
                                            },
                                        }}
                                        transition={{ delay: animationDelay }}
                                    >
                                        <Text
                                            ns="letters"
                                            contentKey={_.labelKey}
                                            weight={isSelected ? 500 : 300}
                                            variant="meta-1"
                                            className={clsx([isSelected ? "text-blue-600" : "text-neutral-600"])}
                                        />
                                    </motion.button>
                                )
                            })
                        ) : (
                            <div className="px-1 py-0.5 text-neutral-300">
                                <Text ns="input" contentKey="no_options_found" className="text-xs" weight={300} />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
