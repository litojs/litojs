import type { CookieOptions } from "../../types";

/**
 *
 *
 * Serializes a cookie key-value pair into a cookie string.
 *
 * This function creates a cookie string that can be sent in HTTP headers.
 * It encodes the key and value and appends any specified attributes such as
 * max age, domain, path, expiration date, secure, HTTP-only, and SameSite.
 *
 * @param key - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional attributes to include with the cookie.
 * @returns A string representation of the cookie.
 *
 */
export function cookieStringify(key: string, value: string, options: CookieOptions = {}): string {
    let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

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
