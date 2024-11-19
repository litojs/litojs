import type { Cookie } from "../../types/cookie";

/**
 *
 *
 * Parses a cookie string into an object of cookies.
 *
 * This function takes a string containing cookies, splits it into individual
 * cookies, and processes each cookie to extract its name, value, and attributes.
 * It returns an object where each key is a cookie name and the value is a
 * Cookie object containing the cookie details.
 *
 * @param cookieString - The string containing the cookies, typically retrieved from the "Cookie" header.
 * @returns An object where keys are cookie names and values are Cookie objects.
 *
 */
export function cookieParser(cookieString: string): Record<string, Cookie> {
    const cookies: Record<string, Cookie> = {};

    cookieString.split(";").forEach((cookie) => {
        const parts = cookie.split(";").map((item) => item.trim());
        const [nameValue, ...attributes] = parts;
        const [name, value] = nameValue.split("=").map((item) => item.trim());

        if (name) {
            const cookie: Cookie = {
                name: decodeURIComponent(name),
                value: decodeURIComponent(value || ""),
                httpOnly: false,
                secure: false,
            };

            attributes.forEach((attribute) => {
                const [attrName, attrValue] = attribute.split("=").map((item) => item.trim().toLowerCase());
                switch (attrName) {
                    case "httponly":
                        cookie.httpOnly = true;
                        break;
                    case "secure":
                        cookie.secure = true;
                        break;
                    case "path":
                        cookie.path = attrValue;
                        break;
                    case "domain":
                        cookie.domain = attrValue;
                        break;
                    case "expires":
                        cookie.expires = new Date(attrValue);
                        break;
                    case "samesite":
                        cookie.sameSite = attrValue as "Strict" | "Lax" | "None";
                        break;
                }
            });

            cookies[cookie.name] = cookie;
        }
    });

    return cookies;
}
