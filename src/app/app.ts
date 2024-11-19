import { importApp } from "../helper/app/app-importer";
import { importPublic } from "../helper/app/public-importer";
import { checkForRouteConflicts, suggestPrefixForConflicts } from "../helper/route/route-checker";
import { Logger } from "../helper/utils/logger";
import type { Configuration } from "../types/config";
import type { Route } from "../types/route";
import { Lito } from "./lito";

export async function App(configuration: Configuration) {
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

    const appInstance = {
        start: () => {
            new Lito(configuration).use(routes).listen(port, () => {
                Logger.success(`Server running on port: ${port}`);
            });
        },
        apps: configuration.apps,
        db: configuration.db,
        dbConfig: configuration.dbConfig,
    };

    appInstance.start();

    return appInstance;
}
