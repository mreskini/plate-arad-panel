/* eslint-disable import/no-extraneous-dependencies */
import { getSystemErrorMessages, getUserAccessToken } from "@core/functions"
import { GraphQLClient } from "graphql-request"

import { getSdk as getClientSdk } from "./generated/Client"
import { getSdk as getCustomerSdk } from "./generated/Customer"
import { getSdk as getDeviceSdk } from "./generated/Device"
import { getSdk as getExportSdk } from "./generated/Export"
import { getSdk as getIdentifierSdk } from "./generated/Identifier"
import { getSdk as getParkingSdk } from "./generated/Parking"
import { getSdk as getReportSdk } from "./generated/Report"
import { getSdk as getRoleSdk } from "./generated/Role"
import { getSdk as getUserSdk } from "./generated/User"

export const StaticGlobalErrorMessage = "مشکلی رخ داده است"
export const USER_PROFILE_IMAGE_UPLOAD_ROUTE = `${import.meta.env.VITE_PUBLIC_BASE_UPLOAD_URL}/user/profile/image`
export const OWNER_VEHICLE_IMAGE_UPLOAD_ROUTE = `${import.meta.env.VITE_PUBLIC_BASE_UPLOAD_URL}/vehicle/image`
export const gqlClient = new GraphQLClient("https://arad-plate-graph.idealink.dev/graphql" as string, {})

type T_AsyncResult<T_Res> =
    | {
          data: T_Res
          error: null
      }
    | {
          data: null
          error: string
      }

function createAsyncProxy<T_Original extends Record<string, (...args: any[]) => any>>(
    original: T_Original
): {
    [K in keyof T_Original]: (
        ...args: Parameters<T_Original[K]>
    ) => Promise<T_AsyncResult<Awaited<ReturnType<T_Original[K]>>>>
} {
    return new Proxy(original, {
        get(target, prop) {
            const originalMethod = target[prop as string]
            return async (...args: any[]) => {
                try {
                    gqlClient.setHeaders({
                        Authorization: (typeof window !== "undefined" && getUserAccessToken()) || "",
                    })
                    const result = await originalMethod.apply(target, args)
                    return { data: result, error: null }
                } catch (error: any) {
                    const errors = getSystemErrorMessages()
                    let localMessage = StaticGlobalErrorMessage
                    if (errors) {
                        const errorCode = error.response.errors[0].message
                        if (errorCode in errors) localMessage = errors[errorCode]
                    }
                    return { data: null, error: localMessage }
                }
            }
        },
    })
}

export const API = {
    User: createAsyncProxy(getUserSdk(gqlClient)),
    Parking: createAsyncProxy(getParkingSdk(gqlClient)),
    Role: createAsyncProxy(getRoleSdk(gqlClient)),
    Device: createAsyncProxy(getDeviceSdk(gqlClient)),
    Client: createAsyncProxy(getClientSdk(gqlClient)),
    Identifier: createAsyncProxy(getIdentifierSdk(gqlClient)),
    Customer: createAsyncProxy(getCustomerSdk(gqlClient)),
    Report: createAsyncProxy(getReportSdk(gqlClient)),
    Export: createAsyncProxy(getExportSdk(gqlClient)),
}

export * from "./generated"
export * from "./types"
