import fs from "fs";
import path from "path";

import type { Route } from "../../types";

/**
 *
 *
 * Imports static files from the "public" directory and registers
 * them as routes in the application.
 *
 * This function scans for CSS, JS, text files, and images in the "public" directory,
 * and adds corresponding GET routes to the provided routes array.
 *
 * @param routes - An array of Route objects to which the public routes will be added.
 *
 */
export function importPublic(routes: Route[]) {
    const publicPath = path.join(process.cwd(), "public"); // Path to the public directory
    const publicFiles = fs.readdirSync(publicPath); // Read contents of the public directory

    // Mapping of file extensions to content types
    const contentTypeMap: { [key: string]: string } = {
        ".css": "text/css; charset=UTF-8",
        ".js": "application/javascript; charset=UTF-8",
        ".txt": "text/plain; charset=UTF-8",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
    };

    // Iterate through each file in the public directory
    for (const file of publicFiles) {
        const filePath = path.join(publicPath, file); // Full path to the current file
        const stats = fs.statSync(filePath); // Get file statistics

        // Check if the current file is a file
        if (stats.isFile()) {
            const ext = path.extname(file); // Get the file extension
            const contentType = contentTypeMap[ext]; // Lookup the content type

            // If a matching content type is found, register the route
            if (contentType) {
                routes.push({
                    method: "GET", // Set the HTTP method
                    path: `/${file}`, // Route path
                    handler: async () => {
                        const fileContent = Bun.file(filePath); // Read the file content
                        const content = await fileContent.text(); // Gets the textual content of the file
                        return new Response(content, {
                            // Returns the content in the response
                            headers: {
                                "content-type": contentType, // Set Content-Type based on the file type
                            },
                        });
                    },
                });
            }
        }
    }
}
