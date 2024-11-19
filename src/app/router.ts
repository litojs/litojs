import type { Route, RouterConfig } from "../types";
import type { Handler, Method } from "../types/handler";
import { Controller, ControllerHandler } from "./controller";

// Utility function to ensure a string starts with a leading slash
const ensureLeadingSlash = (path: string): string => {
    return path.startsWith("/") ? path : `/${path}`;
};

export class Router {
    private routes: Route[] = [];
    public controllerHandler: ControllerHandler;
    private prefix: string;

    constructor(config?: RouterConfig) {
        this.controllerHandler = new ControllerHandler(this);
        if (config !== undefined && config.prefix !== undefined) {
            this.prefix = ensureLeadingSlash(config.prefix);
        } else {
            this.prefix = "";
        }
    }

    private createRoute(method: Method) {
        return (path: string, handler: Handler) => {
            this.routes.push({
                method,
                path: ensureLeadingSlash(path),
                handler,
            });
        };
    }

    public get(path: string, handler: Handler): void {
        return this.createRoute("GET")(path, handler);
    }

    public post(path: string, handler: Handler): void {
        return this.createRoute("POST")(path, handler);
    }

    public put(path: string, handler: Handler): void {
        return this.createRoute("PUT")(path, handler);
    }

    public patch(path: string, handler: Handler): void {
        return this.createRoute("PATCH")(path, handler);
    }

    public delete(path: string, handler: Handler): void {
        return this.createRoute("DELETE")(path, handler);
    }

    public controller<T extends Controller>(ControllerClass: new () => T): ControllerHandler {
        return this.controllerHandler.handle(ControllerClass);
    }

    public getRoutes(): Route[] {
        return this.routes;
    }
}
