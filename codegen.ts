import type { CodegenConfig } from "@graphql-codegen/cli"

const Entities = ["User", "Parking"];

const EntitiesDictionary: { [key: string]: Object } = {}
Entities.forEach(entity => {
    EntitiesDictionary[`src/core/api/gql/generated/${entity}.ts`] = {
        preset: "import-types",
        presetConfig: {
            typesPath: "./operations",
        },
        documents: `src/core/api/gql/entities/${entity}.graphql`,
        plugins: ["typescript-graphql-request"],
    }
})

const config: CodegenConfig = {
    overwrite: true,
    debug: true,
    verbose: true, // keep true for debugging
    schema: "https://arad-graph-local.idealink.dev/graphql",
    generates: {
        ...{
            "src/core/api/gql/generated/schemas.ts": {
                plugins: ["typescript"],
                config: {
                    skipTypename: true,
                },
            },
            "src/core/api/gql/generated/operations.ts": {
                documents: "src/core/api/gql/entities/*.graphql",
                preset: "import-types",
                presetConfig: {
                    typesPath: "./schemas",
                    skipTypename: true,
                },
                config: {
                    skipTypename: true,
                },
                plugins: ["typescript-operations"],
            },
        },
        // Entities
        ...EntitiesDictionary,
    },
}

export default config
