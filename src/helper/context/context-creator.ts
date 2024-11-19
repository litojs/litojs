import { cookieParser } from "../../helper/cookies/cookie-parser";
import { routeMatcher } from "../../helper/route/route-matcher";
import type { CookieOptions, Route } from "../../types";
import type { Context } from "../../types/context";
import { cookieStringify } from "../cookies/cookie-stringify";

/**
 *
 *
 * Creates a context object for the given request and routes.
 *
 * This function matches the request path and method to a route,
 * parses query parameters and cookies, and constructs a context object
 * that contains relevant information for handling the request.
 *
 * @param request - The incoming Request object.
 * @param routes - An array of Route objects used for route matching.
 * @returns An object containing the matched route, the context, and an array for setting cookies.
 *
 */
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

    // Construct the context object with request and cookie management methods
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
            // Get a cookie's value by key
            get: (key: string) => cookies[key],
            // Set a cookie and push to setCookies
            set: (key: string, value: string, options: CookieOptions = {}) => {
                const cookieString = cookieStringify(key, value, options);
                setCookies.push(cookieString);
            },
            // Create a cookie string for deletion
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
