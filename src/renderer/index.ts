/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsType } from "../types/common";

export async function view<T extends (props: any) => any>(component: T, props: PropsType<T>): Promise<Response> {
    const htmlWrapper = (content: string) => `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Hyperapp</title>
                 <script src="https://unpkg.com/htmx.org@2.0.3"></script>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;

    const html = component(props).toString();
    return new Response(htmlWrapper(html), {
        headers: {
            "content-type": "text/html; charset=UTF-8",
        },
    });
}
