import fs from "fs";
import path from "path";

import type { Route } from "../../types";

export function importPublic(routes: Route[]) {
    const publicPath = path.join(process.cwd(), "public");
    const publicFiles = fs.readdirSync(publicPath);

    for (const file of publicFiles) {
        const filePath = path.join(publicPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile() && file.endsWith(".css")) {
            routes.push({
                method: "GET",
                path: `/${file}`,
                handler: async () => {
                    const fileContent = Bun.file(filePath);
                    const content = await fileContent.text();
                    return new Response(content, {
                        headers: {
                            "content-type": "text/css; charset=UTF-8",
                        },
                    });
                },
            });
        }
    }
}
