import type { Route } from "../../types";

/**
 *
 *
 * Checks for route conflicts in the provided routes array.
 *
 * This function identifies if any dynamic routes conflict with
 * existing routes. A dynamic route is considered conflicting
 * if it matches the path of another route that does not
 * contain dynamic segments.
 *
 * @param routes - An array of Route objects to check for conflicts.
 * @returns An array of conflicting route paths.
 *
 */
export function checkForRouteConflicts(routes: Route[]): string[] {
    const conflicts: string[] = []; // Initialize an array to store conflicting routes
    const dynamicRoutePattern = /^\/:[^/]+$/; // Pattern to identify dynamic routes

    for (let i = 0; i < routes.length; i++) {
        const routeA = routes[i];

        if (dynamicRoutePattern.test(routeA.path)) {
            for (let j = 0; j < routes.length; j++) {
                if (i === j) continue; // Skip comparing the same route

                const routeB = routes[j];
                // Create a pattern for routeB by replacing dynamic segments with regex
                const routeBPattern = new RegExp(`^${routeA.path.replace(/:[^/]+/, "[^/]+")}$`);

                if (routeBPattern.test(routeB.path)) {
                    conflicts.push(routeA.path); // Add the conflicting path to conflicts
                    break; // Stop checking after finding a conflict
                }
            }
        }
    }

    return conflicts; // Return the list of conflicting routes
}

/**
 *
 *
 * Suggests a prefix to avoid conflicts based on identified route conflicts.
 *
 * This function generates a message if there are conflicts, suggesting the
 * use of a prefix to mitigate them.
 *
 * @param conflicts - An array of conflicting route paths.
 * @returns A suggestion message if conflicts are found, or an empty string if none.
 *
 */
export function suggestPrefixForConflicts(conflicts: string[]): string {
    if (conflicts.length > 0) {
        return `Conflicting routes found: ${conflicts.join(", ")}. Consider using a prefix to avoid conflicts.`;
    }
    return ""; // Return empty string if no conflicts
}
