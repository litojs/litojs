import type { Context } from "../../types/context";

/**
 *
 *
 * Creates a Response object based on the provided input and context.
 *
 * This function generates a suitable Response object based on the type of the
 * input response. It handles cases for Response instances, objects (JSON), strings,
 * and falls back for invalid types. It also supports setting cookies for the response.
 *
 * @param response - The data to be sent as a response. This can be a Response object,
 *                   a string, or an object that will be serialized to JSON.
 * @param context - The context providing the status and other relevant details for the response.
 * @param setCookies - An array of cookies to be set in the response headers.
 * @returns A Response object constructed based on the input data.
 *
 */
export function createResponse(response: unknown, context: Context, setCookies: string[]): Response {
    const headers = new Headers();

    if (response instanceof Response) {
        response.headers.forEach((value, key) => headers.set(key, value));
    } else if (typeof response === "object") {
        headers.set("Content-Type", "application/json");
        response = new Response(JSON.stringify(response), {
            status: context.status,
        });
    } else if (typeof response === "string") {
        if (response.trim().startsWith("<") && response.trim().endsWith(">")) {
            headers.set("Content-Type", "text/html");
        } else {
            headers.set("Content-Type", "text/plain");
        }
        response = new Response(response, { status: context.status });
    } else {
        response = new Response(String(response), {
            status: context.status,
        });
    }

    if (setCookies.length > 0) {
        headers.set("Set-Cookie", setCookies.join(", "));
    }

    return new Response((response as Response).body, {
        status: context.status,
        headers,
    });
}
