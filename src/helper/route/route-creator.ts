import type { Handler, Method } from "../../types/handler";

export function routeCreator(method: Method, path: string, handler: Handler) {
    return {
        method,
        path,
        handler,
    };
}
