/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsType } from "../types/common";

export function view<T extends (props: any) => any>(component: T, props: PropsType<T>): Response {
    const html = component(props).toString();
    return new Response(html, {
        headers: {
            "content-type": "text/html; charset=UTF-8",
        },
    });
}
