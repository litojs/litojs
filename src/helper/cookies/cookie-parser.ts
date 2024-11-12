import type { Cookie } from "../../types/cookie";

export function cookieParser(cookieString: string): Record<string, Cookie> {
    const cookies: Record<string, Cookie> = {};

    // Split the cookie string by semicolon and trim whitespace
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
