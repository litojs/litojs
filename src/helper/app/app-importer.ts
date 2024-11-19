import { promises as fs } from "fs";
import path from "path";

import { Logger } from "../utils/logger";

/**
 *
 *
 * Imports the specified application and retrieves its routes.
 *
 * This function checks if the app has a router.ts file and attempts to import it.
 * If the router exists, it looks for route definitions and returns them.
 * If the app does not have a router.ts file, a warning is logged.
 *
 * @param app - The name of the application to import.
 * @returns A promise that resolves to the routes defined in the application's router.
 *          If the router is not found, it resolves to undefined.
 *
 * @throws Logs an error if there is an issue importing the application.
 *
 */
export async function importApp(app: string) {
    try {
        const routerPath = path.join(process.cwd(), "apps", app, "router.ts"); // Construct the path to the router.ts file

        // Check if the router.ts file exists
        try {
            await fs.access(routerPath);
        } catch {
            Logger.warn(`You are registering an app that does not have router.ts`);
            return; // Exit if the router file is not found
        }

        const module = await import(routerPath); // Dynamically import the router module

        // Iterate through the exported components of the module
        for (const key in module) {
            if (module[key]?.getRoutes()) {
                // Check if the exported object has a getRoutes method
                return module[key].getRoutes(); // Return the routes if found
            }
        }
    } catch (error) {
        Logger.error(`Error importing app ${app}`, error); // Log error if anything goes wrong
    }
}
