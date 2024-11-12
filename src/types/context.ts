import type { Cookie, CookieOptions } from "./cookie";

export interface Context {
    user: Record<string, unknown> | null;
    params: Record<string, string>;
    headers: Headers;
    path: string;
    status: number;
    cookies: Record<string, Cookie>;
    cookie: {
        get: (key: string) => Cookie | undefined;
        set: (key: string, value: string, options?: CookieOptions) => void;
        delete: (key: string) => void;
    };
    url: Request["url"];
    query: Record<string, string>;
}
