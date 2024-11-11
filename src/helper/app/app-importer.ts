import { Logger } from "../utils/logger";

export async function importApp(app: string) {
    try {
        const routerPath = `${process.cwd()}/apps/${app}/router.ts`;
        const module = await import(routerPath);

        for (const key in module) {
            if (module[key]?.$routes()) {
                return module[key].$routes();
            }
        }
    } catch (error) {
        Logger.error(`Error importing app ${app}`, error);
    }
}
