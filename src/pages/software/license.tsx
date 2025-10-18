import { Loading } from "@components/common"
import { Layout } from "@components/layout"
import { LicenseFileInput } from "@components/pages/Software"
import { Button, Input, Notice, Text, useNotify } from "@components/template"
import { useCommon } from "@core/contexts"
import { sleep } from "@core/functions"
import { useApp } from "@core/stores"
import { useEffect, useState } from "react"

export const License = () => {
    // States and Hooks
    const [isFetching, setIsFetching] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [licenseFile, setLicenseFile] = useState<File | null>(null)
    const { fetchParkingInfo } = useCommon()
    const { parking } = useApp()
    const { isLicenseAvailable } = useCommon()
    const { notify } = useNotify()

    const isValid = licenseFile !== null
    // Methods
    const fetchParking = async () => {
        setIsFetching(true)
        await fetchParkingInfo()
        setIsFetching(false)
    }

    const onSubmit = async () => {
        if (!licenseFile) return

        setIsSubmitting(true)

        const fileText = await licenseFile.text()
        const { clients, license, server_uuid } = JSON.parse(fileText)

        if (!clients || !license || !server_uuid) return

        await sleep(2000)

        setIsSubmitting(false)
        notify("license_updated_successfully", "success")
        // notify("license_update_failed", "error")
    }

    // Use effects
    useEffect(() => {
        fetchParking()
    }, [])

    // Render
    return (
        <Layout.Dashboard>
            {isFetching && <Loading.Screen />}

            {!isFetching && (
                <div className="w-1/2">
                    {!isLicenseAvailable && (
                        <Notice
                            contentKey="license_not_available_please_upload_license_file"
                            ns="alerts"
                            wrapperClassName="mb-4"
                        />
                    )}

                    {parking && isLicenseAvailable && (
                        <div className="flex flex-col gap-6 p-4 rounded-lg bg-emerald-400 text-white mb-4">
                            <div className="flex items-center w-full justify-between">
                                <Text contentKey="license" className="text-white" />

                                {parking.license && (
                                    <Text content={parking.license} className="font-courier" variant="meta-1" />
                                )}
                            </div>

                            <div className="flex items-center w-full justify-between">
                                <Text contentKey="server_uuid" className="text-white" />

                                {parking.server_uuid && (
                                    <Text content={parking.server_uuid} className="font-courier" variant="meta-1" />
                                )}
                            </div>

                            <div className="flex items-center w-full justify-between">
                                <Text contentKey="clients_count" className="text-white" />

                                {parking.clients_count && <Text content={parking.clients_count} />}
                            </div>

                            <div className="flex items-center w-full gap-12">
                                <Input.Checkbox
                                    labelKey="plate_reader"
                                    className="text-white"
                                    disabled
                                    checked={!parking.plate_reader}
                                />

                                <Input.Checkbox labelKey="pos" className="text-white" disabled checked={parking.pos} />
                                <Input.Checkbox labelKey="UHF" className="text-white" disabled checked={!parking.UHF} />
                            </div>
                        </div>
                    )}

                    <LicenseFileInput file={licenseFile} setFile={setLicenseFile} />

                    <div className="mt-4">
                        <Button
                            contentKey="update_license"
                            className="px-20"
                            type="submit"
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting}
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            )}
        </Layout.Dashboard>
    )
}
