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
export {
  Logger
};
