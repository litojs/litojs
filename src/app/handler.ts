import { createContext } from "@/helper/context/context-creator";
import { routeCreator } from "@/helper/route/route-creator";
import { Logger } from "@/helper/utils/logger";
import type { Context } from "@/types";
import type { Handler, Method } from "@/types/handler";

import type { Lito } from "./lito";

export class LitoHandler {
    private lito: Lito;

    constructor(lito: Lito) {
        this.lito = lito;
    }

    // ? ------------------------------------------------------------
    // ? Handler Methods --------------------------------------------
    // ? ------------------------------------------------------------
    private handleResponse(response: unknown, context: Context): Response {
        if (response instanceof Response) {
            return response;
        }

        if (typeof response === "object") {
            return new Response(JSON.stringify(response), {
                status: context.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (typeof response === "string") {
            return new Response(response, { status: context.status });
        }

        return new Response(String(response), { status: context.status });
    }

    // ? ------------------------------------------------------------
    // ? Public Methods ---------------------------------------------
    // ? ------------------------------------------------------------
    public async handleRequest(request: Request) {
        const { route, context } = createContext(request, this.lito.routes);

        if (route) {
            const startTimer = process.hrtime();
            let response;

            try {
                response = await route.handler(context);
            } catch (error) {
                const err = error as Error;
                return new Response(err.message, { status: 500 });
            }

            const endTimer = process.hrtime(startTimer);
            const elapsedTime = (endTimer[0] * 1e9 + endTimer[1]) / 1e6; // Convert to milliseconds

            // ? --------------------------------------------------------
            // ? Log request
            // ? This is standard information logging
            Logger.log(
                `INFO: [${request.method}]:[${context.status}] ${
                    context.path
                } - Time: ${elapsedTime.toFixed(3)}ms`
            );
            // ? --------------------------------------------------------

            return this.handleResponse(response, context);
        }

        // Return 404 if no route is found
        return new Response("Not Found", { status: 404 });
    }

    public addRoute(method: Method, path: string, handler: Handler) {
        this.lito.routes.push(routeCreator(method, path, handler));
        return this;
    }
}
