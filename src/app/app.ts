import { importApp } from "@/helper/app/app-importer";
import {
    checkForRouteConflicts,
    suggestPrefixForConflicts,
} from "@/helper/route/route-checker";
import { Logger } from "@/helper/utils/logger";
import type { Configuration } from "@/types/config";
import type { Route } from "@/types/route";

import { Lito } from "./lito";

/**
 * Initializes and starts the Lito server with the provided configuration.
 * @param {Configuration} configuration - The configuration object containing the apps to be loaded.
 * - `apps` - An array of string, each is to register an app in apps folder.
 */
export async function App(configuration: Configuration): Promise<void> {
    const port = Number(process.env.PORT) || 8000;
    const routes: Route[] = [];

    for (const app of configuration.apps) {
        const appRoutes = await importApp(app);

        if (appRoutes) {
            routes.push(...appRoutes);
        }
    }

    const conflicts = checkForRouteConflicts(routes);
    const conflictMessage = suggestPrefixForConflicts(conflicts);

    if (conflictMessage) {
        Logger.warn(conflictMessage);
    }

    return new Lito(configuration).use(routes).listen(port, () => {
        Logger.success(`Server running on port: ${port}`);
    });
}
