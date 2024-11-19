import type { Route } from "../types";
import type { Configuration } from "../types/config";
import type { Handler, Method } from "../types/handler";
import { LitoHandler } from "./handler";

/**
 *
 *
 * Represents the core application of Lito.
 * It manages routes, configurations, and handles request processing.
 *
 */
export class Lito {
    private _routes: Route[]; // Array of routes defined in the application
    private _configuration: Configuration; // Configuration object for the application
    private _handler: LitoHandler; // Instance of LitoHandler to manage requests

    /**
     *
     *
     * Initializes a new instance of the Lito application.
     *
     * @param configuration - The configuration settings for the Lito application
     *
     */
    constructor(configuration: Configuration) {
        this._routes = [];
        this._configuration = configuration;
        this._handler = new LitoHandler(this);
    }

    // ? ------------------------------------------------------------
    // ? Getters ----------------------------------------------------
    // ? ------------------------------------------------------------

    /**
     *
     *
     * Gets the defined routes in the application.
     *
     * @returns An array of Route objects.
     *
     */
    public get routes() {
        return this._routes;
    }

    /**
     *
     *
     * Gets the configuration settings for the application.
     *
     * @returns The Configuration object used in the application.
     *
     */
    public get config() {
        return this._configuration;
    }

    // ? ------------------------------------------------------------
    // ? Methods ----------------------------------------------------
    // ? ------------------------------------------------------------

    /**
     *
     *
     * Creates a new route and adds it to the handler.
     *
     * @param method - The HTTP method for this route (GET, POST, etc.)
     * @param path - The path for the route
     * @param handler - The function to handle requests to this route
     * @returns The result of adding the route in the handler
     *
     */
    private _createRoute(method: Method, path: string, handler: Handler) {
        return this._handler.addRoute(method, path, handler);
    }

    // ? ------------------------------------------------------------
    // ? Router Methods ---------------------------------------------
    // ? These methods are used to create routes for the application.
    // ? ------------------------------------------------------------

    /**
     *
     *
     * Adds multiple routes to the application.
     *
     * @param routes - An array of Route objects to be added
     * @returns This instance of Lito for method chaining
     *
     */
    public use(routes: Route[]) {
        this._routes.push(...routes); // Spreading the array to push all routes
        return this; // Returning this for chaining
    }

    /**
     *
     *
     * Creates a new GET route for the application.
     *
     * @param path - The path for the route
     * @param handler - The function to handle GET requests
     * @returns The result of the route creation
     *
     */
    public get(path: string, handler: Handler) {
        return this._createRoute("GET", path, handler);
    }

    /**
     *
     *
     * Creates a new POST route for the application.
     *
     * @param path - The path for the route
     * @param handler - The function to handle POST requests
     * @returns The result of the route creation
     *
     */
    public post(path: string, handler: Handler) {
        return this._createRoute("POST", path, handler);
    }

    /**
     *
     *
     * Creates a new PUT route for the application.
     *
     * @param path - The path for the route
     * @param handler - The function to handle PUT requests
     * @returns The result of the route creation
     *
     */
    public put(path: string, handler: Handler) {
        return this._createRoute("PUT", path, handler);
    }

    /**
     *
     *
     * Creates a new PATCH route for the application.
     *
     * @param path - The path for the route
     * @param handler - The function to handle PATCH requests
     * @returns The result of the route creation
     *
     */
    public patch(path: string, handler: Handler) {
        return this._createRoute("PATCH", path, handler);
    }

    /**
     *
     *
     * Creates a new DELETE route for the application.
     *
     * @param path - The path for the route
     * @param handler - The function to handle DELETE requests
     * @returns The result of the route creation
     *
     */
    public delete(path: string, handler: Handler) {
        return this._createRoute("DELETE", path, handler);
    }

    /**
     *
     *
     * Starts the server and listens for incoming requests.
     *
     * @param port - The port number on which the server will listen
     * @param callback - Optional callback function to run when the server starts
     *
     */
    public listen(port: number, callback?: () => void) {
        if (callback) {
            callback(); // Call the callback if provided
        }

        Bun.serve({
            port,
            fetch: (request: Request) => this._handler.handleRequest(request), // Handle incoming requests
        });
    }
}
