// src/app/controller.ts
import chalk2 from "chalk";

// src/helper/utils/logger.ts
import chalk from "chalk";
var Logger = class {
  static log(message, error) {
    console.log(message, error ?? "");
  }
  static info(message, error) {
    console.log(chalk.blue(message), error);
  }
  static warn(message, error) {
    console.log(chalk.yellow(message), error ?? "");
  }
  static success(message, error) {
    console.log(chalk.green(message), error ?? "");
  }
  static error(message, error) {
    console.log(chalk.red(message), error ?? "");
  }
};

// src/app/controller.ts
var Controller = class {
};
var ControllerHandler = class {
  router;
  controllerInstance;
  constructor(router) {
    this.router = router;
  }
  handle(ControllerClass) {
    this.controllerInstance = new ControllerClass();
    return this;
  }
  getMethod(methodName) {
    const method = this.controllerInstance[methodName];
    if (typeof method !== "function") {
      Logger.error(
        `Method "${chalk2.underline(
          chalk2.italic(String(methodName))
        )}" does not exist on controller ${chalk2.underline(
          chalk2.italic(String(this.controllerInstance.constructor.name))
        )}`
      );
    }
    return method;
  }
  get(path, methodName) {
    const method = this.getMethod(methodName);
    this.router.get(
      path,
      (context) => method.call(this.controllerInstance, context)
    );
    return this;
  }
  post(path, methodName) {
    const method = this.getMethod(methodName);
    this.router.post(
      path,
      (context) => method.call(this.controllerInstance, context)
    );
    return this;
  }
  put(path, methodName) {
    const method = this.getMethod(methodName);
    this.router.put(
      path,
      (context) => method.call(this.controllerInstance, context)
    );
    return this;
  }
  patch(path, methodName) {
    const method = this.getMethod(methodName);
    this.router.patch(
      path,
      (context) => method.call(this.controllerInstance, context)
    );
    return this;
  }
  delete(path, methodName) {
    const method = this.getMethod(methodName);
    this.router.delete(
      path,
      (context) => method.call(this.controllerInstance, context)
    );
    return this;
  }
};
export {
  Controller,
  ControllerHandler
};
