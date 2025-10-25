// TODO: This page requires refactoring which will happen on api integration phase.
import type { T_SidebarItem, T_SidebarSubItem } from "@components/layout"
import { Layout, SidebarItems } from "@components/layout"
import { Button, Divider, Input, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { AppRoutes } from "@core/utilities"
import clsx from "clsx"
import { xor } from "lodash"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AddRole = () => {
    // States and Hooks
    const { notify } = useNotify()
    const navigate = useNavigate()
    const [roles, setRoles] = useState(new Set<string>())
    const [roleName, setRoleName] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const isSubmitButtonDisabled = !roleName || roles.size === 0 || isSubmitting

    // Methods
    const onParentClick = (item: T_SidebarItem, checked: boolean) => {
        setRoles(prev => {
            const newSet = new Set(prev)

            if (item.subItems) {
                const links = item.subItems.map(_ => _.link)
                links.forEach(l => {
                    if (checked) newSet.add(l)
                    else newSet.delete(l)
                })
            }

            if (item.link) {
                if (checked) newSet.add(item.link)
                else newSet.delete(item.link)
            }
            return newSet
        })
    }

    const onSubItemClick = (item: T_SidebarSubItem, checked: boolean) => {
        setRoles(prev => {
            const newSet = new Set(prev)
            if (checked) newSet.add(item.link)
            else newSet.delete(item.link)
            return newSet
        })
    }

    const isChecked = (item: T_SidebarItem): boolean => {
        if (item.link) return roles.has(item.link)

        if (item.subItems) {
            const subItemLinks = item.subItems.filter(_ => !_.hidden).map(subItem => subItem.link)
            const checkedSubItems = subItemLinks.filter(link => roles.has(link))
            return xor(subItemLinks, checkedSubItems).length === 0
        }

        return false
    }

    const navigateToRolesPage = () => navigate(AppRoutes.management.roles.index)

    const onSubmit = async () => {
        setIsSubmitting(true)

        const { data, error } = await API.Role.CreateNewRole({
            body: {
                name: roleName,
                permissions: [...roles],
            },
        })

        if (data?.createNewRole) {
            notify("role_added_successfully", "success")
            navigateToRolesPage()
        }

        if (error) toast.error(error)

        setIsSubmitting(false)
    }

    // Render
    return (
        <Layout.Dashboard>
            <div className="sm:min-w-3xl sm:max-w-3xl">
                <div className="mb-4">
                    <Text contentKey="add_new_role" variant="title-1" className="text-blue-500" weight={700} />
                </div>

                <div className="flex w-full items-center gap-4 mb-4">
                    <Input.Label labelKey="role_name" className="grow" required />

                    <Input
                        placeholder="role_name_here"
                        value={roleName}
                        onChange={e => setRoleName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full"
                    />
                </div>

                <form className="sm:min-w-3xl sm:max-w-3xl">
                    <div className="p-2">
                        {/* Note: Dear developer, the customers section is being handled manually as it's the only part needed
                        in case of more exceptions, the entire solution should change. */}
                        {SidebarItems.map(_ => {
                            return (
                                <>
                                    {_.items.map($ => (
                                        <>
                                            <Input.Checkbox
                                                labelKey={$.titleContentKey}
                                                className="font-semibold text-lg"
                                                wrapperClassName={clsx($.subItems && "mb-4")}
                                                ns="common"
                                                disabled={isSubmitting}
                                                checked={isChecked($)}
                                                onChange={e => onParentClick($, e.target.checked)}
                                            />

                                            <div className="grid grid-cols-3">
                                                {$.subItems?.map(subItem => {
                                                    if (subItem.hidden) return null
                                                    return (
                                                        <Input.Checkbox
                                                            labelKey={subItem.titleContentKey}
                                                            className="col-span-1"
                                                            wrapperClassName="py-1"
                                                            ns="common"
                                                            disabled={isSubmitting}
                                                            checked={roles.has(subItem.link)}
                                                            onChange={e => onSubItemClick(subItem, e.target.checked)}
                                                        />
                                                    )
                                                })}
                                            </div>

                                            <Divider className="my-4" />
                                        </>
                                    ))}
                                </>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-4 mt-4 pb-6">
                        <Button
                            contentKey="add"
                            type="submit"
                            className="w-40"
                            loading={isSubmitting}
                            disabled={isSubmitButtonDisabled}
                            onClick={onSubmit}
                        />

                        <Button
                            contentKey="cancel"
                            variant="gray-outline"
                            onClick={() => navigate(-1)}
                            className="w-40"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </Layout.Dashboard>
    )
}
