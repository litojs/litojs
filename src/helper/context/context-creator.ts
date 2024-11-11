import { cookieParser } from "@/helper/cookies/cookie-parser";
import { routeMatcher } from "@/helper/route/route-matcher";
import type { Route } from "@/types";
import type { Context } from "@/types/context";

export function createContext(request: Request, routes: Route[]) {
    const { pathname, searchParams } = new URL(request.url);
    const { method } = request;
    const { route, params } = routeMatcher(pathname, method, routes);

    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        query[key] = value;
    });

    const context: Context = {
        user: null,
        params: {},
        headers: request.headers,
        url: request.url,
        path: pathname,
        cookies: cookieParser(request.headers.get("cookie") || ""),
        query,
    };

    if (params) {
        context.params = params;
    }

    return { route, context };
}
