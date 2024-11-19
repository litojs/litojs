import type { Route, RouterConfig } from "../types";
import type { Handler, Method } from "../types/handler";
import { Controller, ControllerHandler } from "./controller";

// Utility function to ensure a string starts with a leading slash
/**
 *
 *
 * Ensures that a given path starts with a leading slash.
 *
 * @param path - The path string to check and modify if necessary
 * @returns The modified path string with a leading slash
 *
 */
const ensureLeadingSlash = (path: string): string => {
    return path.startsWith("/") ? path : `/${path}`;
};

/**
 *
 *
 * Class responsible for managing routes in the application.
 * It registers routes and delegates request handling to controllers.
 *
 */
export class Router {
    private routes: Route[] = []; // Array of registered routes
    public controllerHandler: ControllerHandler; // Instance of ControllerHandler to manage controller methods
    private prefix: string; // Optional prefix for all routes

    /**
     *
     *
     * Initializes a new instance of the Router class.
     *
     * @param config - Optional configuration object for the router
     *
     */
    constructor(config?: RouterConfig) {
        this.controllerHandler = new ControllerHandler(this);
        if (config !== undefined && config.prefix !== undefined) {
            this.prefix = ensureLeadingSlash(config.prefix); // Ensure prefix starts with a slash
        } else {
            this.prefix = ""; // No prefix by default
        }
    }

    /**
     *
     *
     * Creates a route with the specified HTTP method.
     *
     * @param method - The HTTP method for the route (e.g., "GET", "POST")
     * @returns A function that takes a path and a handler to create the route
     *
     */
    private createRoute(method: Method) {
        return (path: string, handler: Handler) => {
            this.routes.push({
                method,
                path: ensureLeadingSlash(path), // Ensure the path starts with a slash
                handler,
            });
        };
    }

    /**
     *
     *
     * Registers a new GET route in the router.
     *
     * @param path - The path for the route
     * @param handler - The function to handle GET requests
     *
     */
    public get(path: string, handler: Handler): void {
        return this.createRoute("GET")(path, handler);
    }

    /**
     *
     *
     * Registers a new POST route in the router.
     *
     * @param path - The path for the route
     * @param handler - The function to handle POST requests
     *
     */
    public post(path: string, handler: Handler): void {
        return this.createRoute("POST")(path, handler);
    }

    /**
     *
     *
     * Registers a new PUT route in the router.
     *
     * @param path - The path for the route
     * @param handler - The function to handle PUT requests
     *
     */
    public put(path: string, handler: Handler): void {
        return this.createRoute("PUT")(path, handler);
    }

    /**
     *
     *
     * Registers a new PATCH route in the router.
     *
     * @param path - The path for the route
     * @param handler - The function to handle PATCH requests
     *
     */
    public patch(path: string, handler: Handler): void {
        return this.createRoute("PATCH")(path, handler);
    }

    /**
     *
     *
     * Registers a new DELETE route in the router.
     *
     * @param path - The path for the route
     * @param handler - The function to handle DELETE requests
     *
     */
    public delete(path: string, handler: Handler): void {
        return this.createRoute("DELETE")(path, handler);
    }

    /**
     *
     *
     * Attaches a controller to the router.
     *
     * @param ControllerClass - The Controller class to be used for handling requests
     * @returns The ControllerHandler for further configuration
     *
     */
    public controller<T extends Controller>(ControllerClass: new () => T): ControllerHandler {
        return this.controllerHandler.handle(ControllerClass);
    }

    /**
     *
     *
     * Retrieves the list of registered routes.
     *
     * @returns An array of Route objects representing the routes defined in the router
     *
     */
    public getRoutes(): Route[] {
        return this.routes;
    }
}
