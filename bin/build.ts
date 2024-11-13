import { $ } from "bun";
import { build, Options } from "tsup";

const tsupConfig: Options = {
    entryPoints: ["src/**/*.ts"],
    splitting: false,
    sourcemap: false,
    clean: true,
    bundle: true,
};

await Promise.all([
    build({
        ...tsupConfig,
        outDir: "dist",
        format: "esm",
        cjsInterop: false,
    }),
    build({
        outDir: "dist/cjs",
        format: "cjs",
        target: "node20",
        ...tsupConfig,
    }),
]);

await $`tsc --project tsconfig.json`;

await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist/bun",
    minify: true,
    target: "bun",
});

await Promise.all([$`cp dist/*.d.ts dist/cjs`, $`cp dist/ws/*.d.ts dist/cjs/ws/`]);
await $`cp dist/index*.d.ts dist/bun`;

process.exit();
