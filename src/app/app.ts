import { importApp } from "../helper/app/app-importer";
import { importPublic } from "../helper/app/public-importer";
import { checkForRouteConflicts, suggestPrefixForConflicts } from "../helper/route/route-checker";
import { Logger } from "../helper/utils/logger";
import type { Configuration } from "../types/config";
import type { Route } from "../types/route";
import { Lito } from "./lito";

/**
 * Initializes the application with the given configuration and returns an object with a start function and a list of apps.
 *
 * @param {Configuration} configuration - The configuration object for the application.
 * @returns {Promise<{ start: () => void; apps: string[] }>} A promise that resolves to an object containing:
 * - `start`: A function to start the server.
 * - `apps`: An array of app names.
 *
 * The function performs the following steps:
 * 1. Sets the server port from the environment variable `PORT` or defaults to 8000.
 * 2. Initializes an empty array of routes.
 * 3. Iterates over the apps in the configuration, imports their routes, and adds them to the routes array.
 * 4. Imports public routes.
 * 5. Checks for route conflicts and logs a warning if any conflicts are found.
 * 6. Returns an object with a `start` function to start the server and the list of apps.
 */
export async function App(configuration: Configuration): Promise<{ start: () => void; apps: string[] }> {
    const port = Number(process.env.PORT) || 8000;
    const routes: Route[] = [];

    for (const app of configuration.apps) {
        const appRoutes = await importApp(app);

        if (appRoutes) {
            routes.push(...appRoutes);
        }

        importPublic(routes);
    }

    const conflicts = checkForRouteConflicts(routes);
    const conflictMessage = suggestPrefixForConflicts(conflicts);

    if (conflictMessage) {
        Logger.warn(conflictMessage);
    }

    return {
        start() {
            new Lito(configuration).use(routes).listen(port, () => {
                Logger.success(`Server running on port: ${port}`);
            });
        },
        apps: configuration.apps,
    };
}
