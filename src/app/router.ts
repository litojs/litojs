import type { Route } from "@/types";

import type { Handler, Method } from "../types/handler";
import { Controller, ControllerHandler } from "./controller";

export class Router {
    private routes: Route[] = [];
    public controllerHandler: ControllerHandler;

    constructor() {
        this.controllerHandler = new ControllerHandler(this);
    }

    private createRoute(method: Method) {
        return (path: string, handler: Handler) => {
            this.routes.push({
                method,
                path,
                handler,
            });
        };
    }

    public get(path: string, handler: Handler) {
        return this.createRoute("GET")(path, handler);
    }

    public post(path: string, handler: Handler) {
        return this.createRoute("POST")(path, handler);
    }

    public put(path: string, handler: Handler) {
        return this.createRoute("PUT")(path, handler);
    }

    public patch(path: string, handler: Handler) {
        return this.createRoute("PATCH")(path, handler);
    }

    public delete(path: string, handler: Handler) {
        return this.createRoute("DELETE")(path, handler);
    }

    public controller<T extends Controller>(ControllerClass: new () => T) {
        return this.controllerHandler.handle(ControllerClass);
    }

    public getRoutes(): Route[] {
        return this.routes;
    }
}
