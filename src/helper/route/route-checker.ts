import type { Route } from "@/types";

export function checkForRouteConflicts(routes: Route[]): string[] {
    const conflicts: string[] = [];
    const dynamicRoutePattern = /^\/:[^/]+$/;

    for (let i = 0; i < routes.length; i++) {
        const routeA = routes[i];

        if (dynamicRoutePattern.test(routeA.path)) {
            for (let j = 0; j < routes.length; j++) {
                if (i === j) continue;

                const routeB = routes[j];
                const routeBPattern = new RegExp(
                    `^${routeA.path.replace(/:[^/]+/, "[^/]+")}$`
                );

                if (routeBPattern.test(routeB.path)) {
                    conflicts.push(routeA.path);
                    break;
                }
            }
        }
    }

    return conflicts;
}

export function suggestPrefixForConflicts(conflicts: string[]): string {
    if (conflicts.length > 0) {
        return `Conflicting routes found: ${conflicts.join(
            ", "
        )}. Consider using a prefix to avoid conflicts.`;
    }
    return "";
}
