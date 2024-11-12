export interface Cookie {
    name: string;
    value: string;
    httpOnly: boolean;
    secure: boolean;
    path?: string;
    domain?: string;
    expires?: Date;
    sameSite?: "Strict" | "Lax" | "None";
}

export interface CookieOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
}
