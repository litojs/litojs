import { $ } from "bun";
import { build } from "tsup";

await $`rm -rf dist`;

await Promise.all([
    build({
        splitting: false,
        entryPoints: ["src/**/*.ts"],
        format: ["esm"],
        outDir: "dist",
        minify: false,
        sourcemap: false,
        dts: true,
    }),
]);

process.exit();
