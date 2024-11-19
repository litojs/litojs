import { createContext } from "../helper/context/context-creator";
import { createResponse } from "../helper/response/response-creator";
import { routeCreator } from "../helper/route/route-creator";
import { Logger } from "../helper/utils/logger";
import type { Context } from "../types";
import type { Handler, Method } from "../types/handler";
import type { Lito } from "./lito";

/**
 *
 *
 * Class responsible for handling requests in the Lito framework.
 *
 */
export class LitoHandler {
    private lito: Lito; // Instance of the Lito application

    /**
     *
     *
     * Initializes a new instance of the LitoHandler.
     *
     * @param lito - The instance of the Lito application this handler will work with.
     *
     */
    constructor(lito: Lito) {
        this.lito = lito;
    }

    // ? ------------------------------------------------------------
    // ? Handler Methods --------------------------------------------
    // ? ------------------------------------------------------------

    /**
     *
     *
     * Handles the response creation for the given response data and context.
     *
     * @param response - The response data to send back to the client.
     * @param context - The context of the request, including status and headers.
     * @param setCookies - An array of cookies to set on the response.
     * @returns A Response object created for the provided data.
     *
     */
    private handleResponse(response: unknown, context: Context, setCookies: string[]): Response {
        return createResponse(response, context, setCookies);
    }

    // ? ------------------------------------------------------------
    // ? Public Methods ---------------------------------------------
    // ? ------------------------------------------------------------

    /**
     *
     *
     * Handles incoming requests and routes them to the appropriate handler.
     *
     * @param request - The incoming Request object containing data for the request.
     * @returns A promise that resolves to a Response object.
     *
     */
    public async handleRequest(request: Request) {
        const { route, context, setCookies } = createContext(request, this.lito.routes);
        const startTimer = process.hrtime();

        if (route) {
            let response;

            try {
                response = await route.handler(context); // Call the route handler
            } catch (error) {
                const err = error as Error; // Type assertion
                return new Response(err.message, { status: 500 }); // Internal server error
            }

            const endTimer = process.hrtime(startTimer); // Timing the request
            const elapsedTime = (endTimer[0] * 1e9 + endTimer[1]) / 1e6; // Convert to milliseconds

            // ? --------------------------------------------------------
            // ? Log request
            // ? This is standard information logging
            Logger.log(
                `INFO: [${request.method}]:[${context.status}] ${context.path} - Time: ${elapsedTime.toFixed(3)}ms`
            );
            // ? --------------------------------------------------------

            return this.handleResponse(response, context, setCookies); // Handle and return the response
        }

        const endTimer = process.hrtime(startTimer);
        const elapsedTime = (endTimer[0] * 1e9 + endTimer[1]) / 1e6; // Calculate elapsed time for 404 logging
        Logger.warn(`WARN: [${request.method}]:[404] ${context.path} - Time: ${elapsedTime.toFixed(3)}ms`);

        return new Response("Route not found", { status: 404 }); // Return 404 if no route is found
    }

    /**
     *
     *
     * Adds a new route to the Lito application.
     *
     * @param method - The HTTP method (GET, POST, etc.) for this route.
     * @param path - The path for the route.
     * @param handler - The function to handle requests to this route.
     * @returns This instance of LitoHandler for method chaining.
     *
     */
    public addRoute(method: Method, path: string, handler: Handler) {
        this.lito.routes.push(routeCreator(method, path, handler)); // Create and add a new route
        return this; // Return this for chaining
    }
}
