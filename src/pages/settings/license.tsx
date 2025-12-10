import { Loading } from "@components/common"
import { Layout } from "@components/layout"
import { LicenseFileInput } from "@components/pages/Settings"
import { Button, Notice, Text, useNotify } from "@components/template"
import { API } from "@core/api"
import { useCommon } from "@core/contexts"
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
        const { clients, license, server_uuid, uhf, csn, plate_recognition } = JSON.parse(fileText)

        if (!clients || !license || !server_uuid) return

        const { data } = await API.Parking.UpdateParkingLicense({
            body: {
                clients,
                license,
                server_uuid,
                uhf: uhf || false,
                csn: csn || false,
                plate_recognition: plate_recognition || false,
            },
        })

        if (data) {
            notify("license_updated_successfully", "success")
            setLicenseFile(null)
            await fetchParkingInfo()
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(false)
        notify("license_update_failed", "error")
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
                        <div className="flex flex-col gap-4 p-4 rounded-lg border border-emerald-400 mb-4">
                            <div className="flex items-center w-full justify-between border-b border-dashed border-emerald-200 pb-2 px-4">
                                <Text contentKey="license" />

                                {parking.license && (
                                    <Text content={parking.license} className="font-courier" variant="meta-1" />
                                )}
                            </div>

                            <div className="flex items-center w-full justify-between border-b border-dashed border-emerald-200 pb-2 px-4">
                                <Text contentKey="server_uuid" />

                                {parking.server_uuid && (
                                    <Text content={parking.server_uuid} className="font-courier" variant="meta-1" />
                                )}
                            </div>

                            <div className="flex items-center w-full justify-between border-b border-dashed border-emerald-200 pb-2 px-4">
                                <Text contentKey="clients_count" />

                                {parking.clients_count && <Text content={parking.clients_count} variant="meta-1" />}
                            </div>

                            {/* <div className="flex items-center w-full justify-between border-b border-dashed border-emerald-200 pb-2 px-4">
                                <Text contentKey="plate_reader" />
                                <Text
                                    contentKey={parking.plate_recognition ? "has" : "does_not_have"}
                                    variant="meta-1"
                                />
                            </div>

                            <div className="flex items-center w-full justify-between border-b border-dashed border-emerald-200 pb-2 px-4">
                                <Text contentKey="CSN" />
                                <Text contentKey={parking.csn ? "has" : "does_not_have"} variant="meta-1" />
                            </div>

                            <div className="flex items-center w-full justify-between px-4">
                                <Text contentKey="UHF" />
                                <Text contentKey={parking.uhf ? "has" : "does_not_have"} variant="meta-1" />
                            </div> */}
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
