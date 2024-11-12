import { cookieParser } from "@/helper/cookies/cookie-parser";
import { routeMatcher } from "@/helper/route/route-matcher";
import type { CookieOptions, Route } from "@/types";
import type { Context } from "@/types/context";

import { cookieStringify } from "../cookies/cookie-stringify";

export function createContext(request: Request, routes: Route[]) {
    const { pathname, searchParams } = new URL(request.url);
    const { method } = request;
    const { route, params } = routeMatcher(pathname, method, routes);

    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        query[key] = value;
    });
    const cookies = cookieParser(request.headers.get("cookie") || "");
    const setCookies: string[] = [];

    const context: Context = {
        user: null,
        params: {},
        headers: request.headers,
        url: request.url,
        path: pathname,
        status: 200,
        query,
        cookies,
        cookie: {
            get: (key: string) => cookies[key],
            set: (key: string, value: string, options: CookieOptions = {}) => {
                const cookieString = cookieStringify(key, value, options);
                setCookies.push(cookieString);
            },
            delete: (key: string) => {
                const cookieString = cookieStringify(key, "", { maxAge: -1 });
                setCookies.push(cookieString);
            },
        },
    };

    if (params) {
        context.params = params;
    }

    return { route, context, setCookies };
}
