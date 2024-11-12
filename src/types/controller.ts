import type { Context } from "./context";

export type ControllerMethod<T = Context> = (context: T) => Promise<unknown> | unknown;

export interface BaseController<T = Context> {
    [key: string]: ControllerMethod<T>;
}
