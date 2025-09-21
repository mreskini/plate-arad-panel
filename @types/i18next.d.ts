import type { defaultNS, resources } from "../src/i18n"

declare module "i18next" {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS
        resources: (typeof resources)["fa"]
    }
}
