import { createContext } from "../helper/context/context-creator";
import { createResponse } from "../helper/response/response-creator";
import { routeCreator } from "../helper/route/route-creator";
import { Logger } from "../helper/utils/logger";
import type { Context } from "../types";
import type { Handler, Method } from "../types/handler";
import type { Lito } from "./lito";

export class LitoHandler {
    private lito: Lito;

    constructor(lito: Lito) {
        this.lito = lito;
    }

    // ? ------------------------------------------------------------
    // ? Handler Methods --------------------------------------------
    // ? ------------------------------------------------------------
    private handleResponse(response: unknown, context: Context, setCookies: string[]): Response {
        return createResponse(response, context, setCookies);
    }

    // ? ------------------------------------------------------------
    // ? Public Methods ---------------------------------------------
    // ? ------------------------------------------------------------
    public async handleRequest(request: Request) {
        const { route, context, setCookies } = createContext(request, this.lito.routes);
        const startTimer = process.hrtime();

        if (route) {
            let response;

            try {
                response = await route.handler(context);
            } catch (error) {
                const err = error as Error;
                return new Response(err.message, { status: 500 });
            }

            const endTimer = process.hrtime(startTimer);
            const elapsedTime = (endTimer[0] * 1e9 + endTimer[1]) / 1e6;

            // ? --------------------------------------------------------
            // ? Log request
            // ? This is standard information logging
            Logger.log(
                `INFO: [${request.method}]:[${context.status}] ${context.path} - Time: ${elapsedTime.toFixed(3)}ms`
            );
            // ? --------------------------------------------------------

            return this.handleResponse(response, context, setCookies);
        }

        const endTimer = process.hrtime(startTimer);
        const elapsedTime = (endTimer[0] * 1e9 + endTimer[1]) / 1e6;
        Logger.warn(`WARN: [${request.method}]:[404] ${context.path} - Time: ${elapsedTime.toFixed(3)}ms`);

        return new Response("Route not found", { status: 404 });
    }

    public addRoute(method: Method, path: string, handler: Handler) {
        this.lito.routes.push(routeCreator(method, path, handler));
        return this;
    }
}
