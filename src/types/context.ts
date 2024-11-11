import type { Cookie } from "./cookie";

export interface Context {
    user: Record<string, unknown> | null;
    params: Record<string, string>;
    headers: Headers;
    path: string;
    cookies: Record<string, Cookie>;
    url: Request["url"];
    query: Record<string, string>;
}
