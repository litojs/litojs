import type { Context } from "./context";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Response = ResponseInit | Promise<ResponseInit> | Record<string, unknown> | string | unknown[];

export type ReturnHandler = Response | Promise<Response> | Record<string, unknown> | string;

export type Handler = (req: Context) => ReturnHandler;
