import type { Handler, Method } from "./handler";

export interface Route {
    method: Method;
    path: string;
    handler: Handler;
}
