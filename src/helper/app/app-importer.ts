import { promises as fs } from "fs";
import path from "path";

import { Logger } from "../utils/logger";

export async function importApp(app: string) {
    try {
        const routerPath = path.join(process.cwd(), "apps", app, "router.ts");

        // Check if the router.ts file exists
        try {
            await fs.access(routerPath);
        } catch {
            Logger.warn(`You are registering an app that does not have router.ts`);
            return;
        }

        const module = await import(routerPath);

        for (const key in module) {
            if (module[key]?.getRoutes()) {
                return module[key].getRoutes();
            }
        }
    } catch (error) {
        Logger.error(`Error importing app ${app}`, error);
    }
}
