/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsType } from "../../types/common";
import type { Context } from "../../types/context";

export function view<T extends (props: any) => any>(component: T, props: PropsType<T>): Response {
    const html = component(props).toString();
    return new Response(html, {
        headers: {
            "content-type": "text/html; charset=UTF-8",
        },
    });
}

export function createResponse(response: unknown, context: Context, setCookies: string[]): Response {
    const headers = new Headers();

    // Check if response is an instance of Response
    if (response instanceof Response) {
        response.headers.forEach((value, key) => headers.set(key, value));
    }

    // Check if response is an object and stringify it as JSON
    else if (typeof response === "object") {
        headers.set("Content-Type", "application/json");
        response = new Response(JSON.stringify(response), {
            status: context.status,
        });
    }

    // Check if response is an HTML string
    else if (typeof response === "string") {
        // Check if the response string contains HTML content (basic heuristic)
        if (response.trim().startsWith("<") && response.trim().endsWith(">")) {
            headers.set("Content-Type", "text/html");
        } else {
            headers.set("Content-Type", "text/plain");
        }
        response = new Response(response, { status: context.status });
    }

    // Fallback for other types (e.g., numbers)
    else {
        response = new Response(String(response), {
            status: context.status,
        });
    }

    // Set cookies if there are any
    if (setCookies.length > 0) {
        headers.set("Set-Cookie", setCookies.join(", "));
    }

    // Return the final response
    return new Response((response as Response).body, {
        status: context.status,
        headers,
    });
}
