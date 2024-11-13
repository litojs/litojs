import type { Context } from "../../types/context";

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

    // Return the final response
    return new Response((response as Response).body, {
        status: context.status,
        headers,
    });
}
