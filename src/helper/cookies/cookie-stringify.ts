import type { CookieOptions } from "@/types";

export function cookieStringify(
    key: string,
    value: string,
    options: CookieOptions = {}
): string {
    let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(
        value
    )}`;

    if (options.maxAge !== undefined) {
        cookieString += `; Max-Age=${options.maxAge}`;
    }

    if (options.domain) {
        cookieString += `; Domain=${options.domain}`;
    }

    if (options.path) {
        cookieString += `; Path=${options.path}`;
    }

    if (options.expires) {
        cookieString += `; Expires=${options.expires.toUTCString()}`;
    }

    if (options.secure) {
        cookieString += `; Secure`;
    }

    if (options.httpOnly) {
        cookieString += `; HttpOnly`;
    }

    if (options.sameSite) {
        cookieString += `; SameSite=${options.sameSite}`;
    }

    return cookieString;
}
