import type { Route } from "../../types";
import { routeMatch } from "./route-match";
import { routeNormalizer } from "./route-normalizer";

export function routeMatcher(pathname: string, method: string, routes: Route[]) {
    for (const route of routes) {
        const routePattern = routeNormalizer(route.path);
        const match = routeMatch(routePattern, pathname);

        if (match && route.method === method) {
            const params = match.groups;
            return { route, params };
        }
    }

    return {};
}
