import chalk from "chalk";

import { Logger } from "../helper/utils/logger";
import type { Context, ReturnHandler } from "../types";
import type { BaseController, ControllerMethod } from "../types/controller";
import type { Router } from "./router";

/**
 *
 *
 * Abstract base class for a Controller.
 * It can have any number of ControllerMethod implementations.
 *
 * @typeParam T - The context type, defaults to Context.
 *
 */
export abstract class Controller<T = Context> implements BaseController<T> {
    [key: string]: ControllerMethod<T>; // Dynamic method definition
}

/**
 *
 *
 * Class that handles the mapping of HTTP requests to controller methods.
 *
 */
export class ControllerHandler {
    private router: Router; // Instance of the Router
    private controllerInstance!: Controller; // Instance of the Controller

    /**
     *
     *
     * Initializes a new ControllerHandler instance with a given router.
     *
     * @param router - Instance of the Router to handle requests.
     *
     */
    constructor(router: Router) {
        this.router = router;
    }

    /**
     *
     *
     * Sets the controller instance for this handler.
     *
     * @param ControllerClass - Constructor of the Controller class to instantiate.
     * @returns This instance of the ControllerHandler for method chaining.
     *
     */
    public handle<T extends Controller>(ControllerClass: new () => T) {
        this.controllerInstance = new ControllerClass();
        return this;
    }

    /**
     *
     *
     * Retrieves a method from the controller instance by name.
     *
     * @param methodName - The name of the method to retrieve.
     * @returns The controller method as a ControllerMethod.
     *
     * @throws Error if the method does not exist on the controller.
     *
     */
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

    /**
     *
     *
     * Maps a GET request to a controller method.
     *
     * @param path - The endpoint path for the GET request.
     * @param methodName - The name of the method in the controller to handle GET requests.
     * @returns This instance of the ControllerHandler for method chaining.
     *
     */
    public get<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.get(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    /**
     *
     *
     * Maps a POST request to a controller method.
     *
     * @param path - The endpoint path for the POST request.
     * @param methodName - The name of the method in the controller to handle POST requests.
     * @returns This instance of the ControllerHandler for method chaining.
     *
     */
    public post<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.post(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    /**
     *
     *
     * Maps a PUT request to a controller method.
     *
     * @param path - The endpoint path for the PUT request.
     * @param methodName - The name of the method in the controller to handle PUT requests.
     * @returns This instance of the ControllerHandler for method chaining.
     *
     */
    public put<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.put(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    /**
     *
     *
     * Maps a PATCH request to a controller method.
     *
     * @param path - The endpoint path for the PATCH request.
     * @param methodName - The name of the method in the controller to handle PATCH requests.
     * @returns This instance of the ControllerHandler for method chaining.
     *
     */
    public patch<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.patch(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }

    /**
     *
     *
     * Maps a DELETE request to a controller method.
     *
     * @param path - The endpoint path for the DELETE request.
     * @param methodName - The name of the method in the controller to handle DELETE requests.
     * @returns This instance of the ControllerHandler for method chaining.
     *
     */
    public delete<T extends Controller>(path: string, methodName: keyof T) {
        const method = this.getMethod(methodName);
        this.router.delete(
            path,
            (context: Context): ReturnHandler => method.call(this.controllerInstance, context) as ReturnHandler
        );
        return this;
    }
}
