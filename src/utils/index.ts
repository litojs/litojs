/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";

import { Logger } from "../helper/utils/logger";
import type { PropsType } from "../types/common";

export async function view<T extends (props: any) => any>(component: T, props: PropsType<T>): Promise<Response> {
    const routerPath = path.join(process.cwd(), "index.html");
    const file = Bun.file(routerPath);

    if (!file.exists()) {
        Logger.error(`Please create an index.html file in the root of your project`);
    }

    // ! NEEDS TO BE FIXED
    const wrapper = await file.text();
    const html = component(props).toString();
    const finalWrapper = wrapper.replace("<body></body>", `<body>${html}</body>`);
    console.log(finalWrapper);

    return new Response(finalWrapper, {
        headers: {
            "content-type": "text/html; charset=UTF-8",
        },
    });
}

export async function redirect(url: string): Promise<Response> {
    return new Response(null, {
        status: 302,
        headers: {
            location: url,
        },
    });
}
