import chalk from "chalk";

import { Logger } from "../helper/utils/logger";
import type { Context, ReturnHandler } from "../types";
import type { BaseController, ControllerMethod } from "../types/controller";
import type { Router } from "./router";

export abstract class Controller<T = Context> implements BaseController<T> {
    [key: string]: ControllerMethod<T>;
}

export class ControllerHandler {
    private router: Router;
    private controllerInstance!: Controller;

    constructor(router: Router) {
        this.router = router;
    }

    public handle<T extends Controller>(ControllerClass: new () => T) {
        this.controllerInstance = new ControllerClass();
        return this;
    }

    private getMethod<T extends Controller<Context>>(methodName: keyof T): ControllerMethod<Context> {
        const method = this.controllerInstance[methodName as string];
        if (typeof method !== "function") {
            Logger.error(
                `Method "${chalk.underline(
                    chalk.italic(String(methodName))
                )}" does not exist on controller ${chalk.underline(
                    chalk.italic(String(this.controllerInstance.constructor.name))
                )}`
            );
        }
        return method;
    }

    public get<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.get(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    public post<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.post(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    public put<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.put(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    public patch<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.patch(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    public delete<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.delete(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }
}
