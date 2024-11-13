import { $ } from "bun";

await $`rm -rf dist`;
await $`bun build src/**/*.ts --target=bun`;
// await $`tsc`;

process.exit();
