// src/helper/app/app-importer.ts
import { promises as fs } from "fs";
import path from "path";

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

// src/helper/app/app-importer.ts
async function importApp(app) {
  try {
    const routerPath = path.join(process.cwd(), "apps", app, "router.ts");
    try {
      await fs.access(routerPath);
    } catch {
      Logger.warn(`You are registering an app that does not have router.ts`);
      return;
    }
    const module = await import(routerPath);
    for (const key in module) {
      if (module[key]?.getRoutes()) {
        return module[key].getRoutes();
      }
    }
  } catch (error) {
    Logger.error(`Error importing app ${app}`, error);
  }
}
export {
  importApp
};
