// TODO: This page requires refactoring which will happen on api integration phase.
import { Loading } from "@components/common"
import type { T_SidebarItem, T_SidebarSubItem } from "@components/layout"
import { Layout, SidebarItems } from "@components/layout"
import { Button, Divider, Input, Text } from "@components/template"
import { sleep } from "@core/functions"
import { AppRoutes } from "@core/utilities"
import clsx from "clsx"
import { xor } from "lodash"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditRole = () => {
    // States and Hooks
    const navigate = useNavigate()
    const { token } = useParams<{ token: string }>()
    const [roles, setRoles] = useState(new Set<string>())
    const [roleName, setRoleName] = useState<string>("")
    const [isRoleDefault, setIsRoleDefault] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const isSubmitButtonDisabled = !roleName || roles.size === 0 || isSubmitting
    const isRoleNameFieldDisabled = isSubmitting || isRoleDefault

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
        if (!token) return
        setIsSubmitting(true)

        await sleep(2000)
        navigateToRolesPage()

        // const { data, error } = await API.Role.UpdateRole({
        //     body: {
        //         token,
        //         name: roleName,
        //         permissions: [...roles],
        //     },
        // })

        // if (data?.updateRole) {
        //     await fetchCurrentUser()
        //     notify("role_edited_successfully", "success")
        //     navigate(-1)
        // }

        // // TODO: Error handling by key value pair
        // if (error) notify("something_went_wrong", "error")

        setIsSubmitting(false)
    }

    const fetchRole = async () => {
        if (!token) return

        await sleep(2000)

        // const { data } = await API.Role.FetchRoleByToken({
        //     body: {
        //         token,
        //     },
        // })

        // if (!data?.fetchRoleByToken) navigateToRolesPage()

        // if (data?.fetchRoleByToken) {
        //     setRoleName(data.fetchRoleByToken.name)
        //     setIsRoleDefault(data.fetchRoleByToken.is_default)

        //     const arrayOfRoles = data.fetchRoleByToken.permissions.map(_ => _.link)
        //     setRoles(new Set(arrayOfRoles))
        // }

        setRoleName("نقش تست")
        setIsRoleDefault(true)

        const arrayOfRoles = [
            "/",
            "/reports/traffic",
            "/management/roles",
            "/management/users",
            "/management/owners",
            "/settings",
        ]

        setRoles(new Set(arrayOfRoles))

        setIsFetching(false)
    }

    // Use effects
    useEffect(() => {
        if (!token) navigateToRolesPage()
        if (token) fetchRole()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {isFetching && <Loading.Screen />}

            {!isFetching && (
                <div className="sm:min-w-3xl sm:max-w-3xl">
                    <div className="mb-4">
                        <Text contentKey="edit_role" variant="title-1" className="text-blue-500" weight={700} />
                    </div>

                    <div className="flex w-full items-center gap-4 mb-4">
                        <Input.Label labelKey="role_name" className="grow" required />

                        <Input
                            placeholder="role_name_here"
                            value={roleName}
                            onChange={e => setRoleName(e.target.value)}
                            disabled={isRoleNameFieldDisabled}
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
                                                                onChange={e =>
                                                                    onSubItemClick(subItem, e.target.checked)
                                                                }
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
                                contentKey="save"
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
            )}
        </Layout.Dashboard>
    )
}
