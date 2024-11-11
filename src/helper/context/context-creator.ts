import { cookieParser } from "@/helper/cookies/cookie-parser";
import { routeMatcher } from "@/helper/route/route-matcher";
import type { Context } from "@/types/context";
import type { Route } from "@/types/handler";

export function createContext(request: Request, routes: Route[]) {
    const { pathname } = new URL(request.url);
    const { method } = request;
    const { route, params } = routeMatcher(pathname, method, routes);

    const context: Context = {
        user: null,
        params: {},
        headers: request.headers,
        url: request.url,
        cookies: cookieParser(request.headers.get("cookie") || ""),
    };

    if (params) {
        context.params = params;
    }

    return { route, context };
}
