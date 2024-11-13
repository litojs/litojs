"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/router.ts
var router_exports = {};
__export(router_exports, {
  Router: () => Router
});
module.exports = __toCommonJS(router_exports);

// src/app/controller.ts
var import_chalk2 = __toESM(require("chalk"), 1);

// src/helper/utils/logger.ts
var import_chalk = __toESM(require("chalk"), 1);
var Logger = class {
  static log(message, error) {
    console.log(message, error ?? "");
  }
  static info(message, error) {
    console.log(import_chalk.default.blue(message), error);
  }
  static warn(message, error) {
    console.log(import_chalk.default.yellow(message), error ?? "");
  }
  static success(message, error) {
    console.log(import_chalk.default.green(message), error ?? "");
  }
  static error(message, error) {
    console.log(import_chalk.default.red(message), error ?? "");
  }
};

// src/app/controller.ts
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
        `Method "${import_chalk2.default.underline(
          import_chalk2.default.italic(String(methodName))
        )}" does not exist on controller ${import_chalk2.default.underline(
          import_chalk2.default.italic(String(this.controllerInstance.constructor.name))
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

// src/app/router.ts
var Router = class {
  routes = [];
  controllerHandler;
  prefix;
  constructor(config) {
    this.controllerHandler = new ControllerHandler(this);
    if (config !== void 0 && config.prefix !== void 0) {
      this.prefix = config.prefix;
    } else {
      this.prefix = "";
    }
  }
  createRoute(method) {
    return (path, handler) => {
      this.routes.push({
        method,
        path,
        handler
      });
    };
  }
  get(path, handler) {
    return this.createRoute("GET")(path, handler);
  }
  post(path, handler) {
    return this.createRoute("POST")(path, handler);
  }
  put(path, handler) {
    return this.createRoute("PUT")(path, handler);
  }
  patch(path, handler) {
    return this.createRoute("PATCH")(path, handler);
  }
  delete(path, handler) {
    return this.createRoute("DELETE")(path, handler);
  }
  controller(ControllerClass) {
    return this.controllerHandler.handle(ControllerClass);
  }
  getRoutes() {
    return this.routes;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Router
});
