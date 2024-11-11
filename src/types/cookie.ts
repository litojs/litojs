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
