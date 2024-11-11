import type { Route } from "@/types";

import type { Configuration } from "../types/config";
import type { Handler, Method } from "../types/handler";
import { LitoHandler } from "./handler";

export class Lito {
    private _routes: Route[];
    private _configuration: Configuration;
    private _handler: LitoHandler;

    constructor(configuration: Configuration) {
        this._routes = [];
        this._configuration = configuration;
        this._handler = new LitoHandler(this);
    }

    // ? ------------------------------------------------------------
    // ? Getters ----------------------------------------------------
    // ? ------------------------------------------------------------
    public get routes() {
        return this._routes;
    }

    public get config() {
        return this._configuration;
    }

    // ? ------------------------------------------------------------
    // ? Methods ----------------------------------------------------
    // ? ------------------------------------------------------------

    private _createRoute(method: Method, path: string, handler: Handler) {
        return this._handler.addRoute(method, path, handler);
    }

    // ? ------------------------------------------------------------
    // ? Router Methods ---------------------------------------------
    // ? These methods are used to create routes for the application.
    // ? ------------------------------------------------------------

    public use(routes: Route[]) {
        this._routes.push(...routes);
        return this;
    }

    public get(path: string, handler: Handler) {
        return this._createRoute("GET", path, handler);
    }

    public post(path: string, handler: Handler) {
        return this._createRoute("POST", path, handler);
    }

    public put(path: string, handler: Handler) {
        return this._createRoute("PUT", path, handler);
    }

    public patch(path: string, handler: Handler) {
        return this._createRoute("PATCH", path, handler);
    }

    public delete(path: string, handler: Handler) {
        return this._createRoute("DELETE", path, handler);
    }

    public listen(port: number, callback?: () => void) {
        if (callback) {
            callback();
        }

        Bun.serve({
            port,
            fetch: (request: Request) => this._handler.handleRequest(request),
        });
    }
}
