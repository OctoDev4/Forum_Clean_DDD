import {defineConfig} from "vitest/config"
import tsconfigPaths from "vite-plugin-tsconfig-paths";

export default defineConfig({
    plugins:[
        tsconfigPaths()
    ],
    test:{
        environmentMatchGlobs:[
            ['src/http/controllers/**','prisma']
        ],
    }
})