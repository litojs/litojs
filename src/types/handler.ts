import type { Context } from "./context";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Response = ResponseInit | Promise<ResponseInit> | Record<string, unknown> | string;

export type ReturnHandler = Response | Promise<Response> | Record<string, unknown> | string;

export type Handler = (req: Context) => ReturnHandler;

export interface Route {
  method: Method;
  path: string;
  handler: Handler;
}
