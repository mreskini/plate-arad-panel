import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@core": path.resolve("./src/core"),
            "@components": path.resolve("./src/components"),
            "@locales": path.resolve("./src/locales"),
        },
    },
})
