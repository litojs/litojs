import type { Handler, Method, Route } from "../types/handler";

const createRoute =
    (routes: Route[], method: Method) => (path: string, handler: Handler) => {
        routes.push({
            method,
            path,
            handler,
        });
    };

export function Router() {
    const routes: Route[] = [];

    return {
        get: createRoute(routes, "GET"),
        post: createRoute(routes, "POST"),
        put: createRoute(routes, "PUT"),
        patch: createRoute(routes, "PATCH"),
        delete: createRoute(routes, "DELETE"),

        $routes: () => {
            return routes;
        },
    };
}
