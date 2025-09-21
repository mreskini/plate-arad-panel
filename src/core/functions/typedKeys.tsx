/* eslint-disable @typescript-eslint/naming-convention */
import { keys } from "lodash"

export const typedKeys = <T extends object>(obj: T): Array<keyof T> => keys(obj) as Array<keyof T>
