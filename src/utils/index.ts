/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";

import { Logger } from "../helper/utils/logger";
import type { PropsType } from "../types/common";

/**
 *
 *
 * Renders a component with the provided props and wraps it in an HTML template.
 *
 * This function reads an index.html file from the root of the project,
 * inserts the generated HTML from the component, and returns a Response with the final HTML.
 *
 * @param component - The component function that takes props and returns HTML.
 * @param props - The properties to pass to the component function.
 * @returns A promise that resolves to a Response containing the rendered HTML.
 *
 * @throws Logs an error if the index.html file does not exist.
 *
 */
export async function view<T extends (props: any) => any>(component: T, props: PropsType<T>): Promise<Response> {
    const routerPath = path.join(process.cwd(), "index.html"); // Path to the index.html file
    const file = Bun.file(routerPath);

    // Check if the index.html file exists
    if (!file.exists()) {
        Logger.error(`Please create an index.html file in the root of your project`);
    }

    const wrapper = await file.text(); // Read the content of index.html
    const html = component(props).toString(); // Render the component to HTML
    const finalWrapper = wrapper.replace("<body></body>", `<body>${html}</body>`); // Insert the HTML into the template

    return new Response(finalWrapper, {
        headers: {
            "content-type": "text/html; charset=UTF-8", // Set the content type to HTML
        },
    });
}

/**
 *
 *
 * Redirects the client to a new URL.
 *
 * This function creates a 302 response to redirect the client to the specified location.
 *
 * @param url - The URL to redirect the client to.
 * @returns A promise that resolves to a Response with the redirect status.
 *
 */
export async function redirect(url: string): Promise<Response> {
    return new Response(null, {
        status: 302, // HTTP status code for redirection
        headers: {
            location: url, // The URL to redirect to
            "HX-Location": url, // Additional header for htmx
        },
    });
}
