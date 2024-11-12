import type { Handler, Method } from "./handler";

export interface RouterConfig {
    prefix: string;
}

export interface Route {
    method: Method;
    path: string;
    handler: Handler;
}
