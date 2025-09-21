/* eslint-disable no-nested-ternary */
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown2, CloseCircle } from "iconsax-reactjs"
import { debounce, find } from "lodash"
import type { FC } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "../Button"
import { Text } from "../Text"
import type { I_DropDown, T_InputDropdownOption } from "./Input.types"

export const DropDown: FC<I_DropDown> = ({
    placeholder = "please_select",
    value = "",
    setValue = () => {},
    icon,
    options,
    disabled,
    loading = false,
    wrapperClassName = "",
    onSearch,
    clearable = false,
    ...rest
}) => {
    // States and hooks
    const { className } = rest
    const [showMenu, setShowMenu] = useState(false)
    const [selectedOption, setSelectedOption] = useState<T_InputDropdownOption | undefined>()
    const [searchValue, setSearchValue] = useState("")
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [isSearching, setIsSearching] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation("input")

    const isFilteredOptionsAvailable = filteredOptions.length > 0
    const isLoading = isSearching || loading
    const isClearButtonAvailable = selectedOption && clearable

    const debouncedSearch = useCallback(
        debounce(
            async (searchTerm: string) => {
                if (onSearch && searchTerm.length >= 1) {
                    setIsSearching(true)
                    try {
                        const result = await onSearch(searchTerm)
                        if (result) setFilteredOptions(result)
                    } catch (error) {
                        setFilteredOptions([])
                    } finally {
                        setIsSearching(false)
                    }
                } else {
                    if (!searchTerm) {
                        setFilteredOptions(options)
                        return
                    }
                    const filtered = options.filter(option => {
                        if (option.label) return option.label.toLowerCase().includes(searchTerm.toLowerCase())
                        if (option.labelKey) return t(option.labelKey).toLowerCase().includes(searchTerm.toLowerCase())
                        return false
                    })
                    setFilteredOptions(filtered)
                }
            },
            onSearch ? 500 : 0
        ),
        [options, t, onSearch]
    )

    // Methods
    const clearSelectedOption = () => {
        setValue("")
        setSelectedOption(undefined)
        setShowMenu(false)
    }

    const optionClickHandler = (option: T_InputDropdownOption) => {
        setValue(option.value)
        setSelectedOption(option)
        setSearchValue("")
        setShowMenu(false)
        if (!onSearch) setFilteredOptions(options)
    }

    const toggleMenu = () => {
        if (loading) return
        setShowMenu(prev => !prev)
        if (!showMenu) {
            setSearchValue("")
            if (!onSearch) setFilteredOptions(options)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        debouncedSearch(e.target.value)
    }

    useEffect(() => {
        const selected = find(options, { value }) || find(filteredOptions, { value })
        setSelectedOption(selected)

        // NOTE: Removal of onSearch is to let the options to be set for the initial values...
        // This may cause later bugs as it's not tested.
        // if (!searchValue && !onSearch) setFilteredOptions(options)
        if (!searchValue) setFilteredOptions(options)
    }, [value, options, filteredOptions, searchValue, onSearch])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowMenu(false)
                setSearchValue("")
                if (!onSearch) setFilteredOptions(options)
            }
        }

        if (showMenu) document.addEventListener("mousedown", handleClickOutside)
        if (!showMenu) document.removeEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            debouncedSearch.cancel()
        }
    }, [showMenu, options, debouncedSearch, onSearch])

    useEffect(() => {
        if (showMenu) inputRef.current?.focus()
        if (!showMenu) inputRef.current?.blur()
    }, [showMenu])

    // Render
    return (
        <div ref={dropdownRef} className={clsx(["relative flex items-center w-full", wrapperClassName])}>
            <input
                ref={inputRef}
                type="text"
                className={clsx([
                    className,
                    "peer w-full cursor-pointer rounded-md border border-solid border-neutral-300 bg-white py-2 px-4 text-base font-light text-neutral-800 outline-none placeholder:text-base placeholder:font-light placeholder:text-neutral-300 focus:border-blue-300 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-500 disabled:placeholder:text-zinc-500",
                ])}
                placeholder={t(placeholder)}
                value={showMenu ? searchValue : selectedOption?.label ?? t(selectedOption?.labelKey!) ?? ""}
                onClick={toggleMenu}
                onChange={handleSearchChange}
                disabled={disabled || loading}
            />

            <button
                className="absolute inset-y-0 left-3 mb-0 flex cursor-pointer items-center text-neutral-400 peer-focus:text-blue-500"
                type="button"
                onClick={toggleMenu}
            >
                {icon}
            </button>

            {!isClearButtonAvailable && (
                <motion.button
                    className={clsx([
                        "absolute inset-y-0 left-3 z-10 cursor-pointer text-neutral-400 peer-focus:text-blue-500",
                        showMenu ? "text-blue-500" : "text-neutral-400",
                    ])}
                    type="button"
                    animate={{ rotate: showMenu ? 180 : 0, transformOrigin: "center" }}
                    transition={{ duration: 0.15 }}
                    onClick={toggleMenu}
                >
                    <ArrowDown2 size={20} className="text-neutral-300" />
                </motion.button>
            )}

            {isClearButtonAvailable && (
                <Button
                    variant="ghost"
                    className={clsx([
                        "absolute inset-y-0 left-3 z-10 cursor-pointer text-red-500 disabled:text-neutral-300",
                        showMenu ? "text-blue-500" : "text-neutral-400",
                    ])}
                    onClick={clearSelectedOption}
                    disabled={disabled || loading}
                >
                    <CloseCircle size={20} />
                </Button>
            )}

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        className={clsx([
                            "absolute -bottom-2 z-50 flex max-h-40 w-full border border-neutral-300 translate-y-full flex-col overflow-y-auto rounded-md bg-white",
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
                        {isLoading && (
                            <div className="px-4 py-1.5 text-neutral-300">
                                <Text ns="input" contentKey="please_wait" variant="meta-1" weight={300} />
                                <Text content="..." variant="meta-1" weight={300} />
                            </div>
                        )}

                        {!isLoading &&
                            isFilteredOptionsAvailable &&
                            filteredOptions.map((_, index) => {
                                const isSelected = selectedOption?.value === _.value
                                const animationDelay = 0.05 * index

                                return (
                                    <motion.button
                                        key={_.value}
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
                                        {_.label && (
                                            <Text
                                                ns="input"
                                                content={_.label}
                                                weight={isSelected ? 500 : 300}
                                                variant="meta-1"
                                                className={clsx([isSelected ? "text-blue-600" : "text-neutral-600"])}
                                            />
                                        )}
                                        {!_.label && _.labelKey && (
                                            <Text
                                                ns="input"
                                                contentKey={_.labelKey}
                                                weight={isSelected ? 500 : 300}
                                                variant="meta-1"
                                                className={clsx([isSelected ? "text-blue-600" : "text-neutral-600"])}
                                            />
                                        )}
                                    </motion.button>
                                )
                            })}

                        {!isLoading && !isFilteredOptionsAvailable && (
                            <div className="px-4 py-1.5 text-neutral-300">
                                <Text ns="input" contentKey="no_options_found" variant="meta-1" weight={300} />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
