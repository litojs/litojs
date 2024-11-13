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

// src/helper/app/app-importer.ts
var app_importer_exports = {};
__export(app_importer_exports, {
  importApp: () => importApp
});
module.exports = __toCommonJS(app_importer_exports);
var import_fs = require("fs");
var import_path = __toESM(require("path"), 1);

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

// src/helper/app/app-importer.ts
async function importApp(app) {
  try {
    const routerPath = import_path.default.join(process.cwd(), "apps", app, "router.ts");
    try {
      await import_fs.promises.access(routerPath);
    } catch {
      Logger.warn(`You are registering an app that does not have router.ts`);
      return;
    }
    const module2 = await import(routerPath);
    for (const key in module2) {
      if (module2[key]?.getRoutes()) {
        return module2[key].getRoutes();
      }
    }
  } catch (error) {
    Logger.error(`Error importing app ${app}`, error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  importApp
});
