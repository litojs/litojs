import chalk from "chalk";

import type { LitoError } from "@/types/error";

export class Logger {
    static log(message: string, error?: LitoError) {
        console.log(message, error ?? "");
    }

    static info(message: string, error?: LitoError) {
        console.log(chalk.blue(message), error);
    }

    static warn(message: string, error?: LitoError) {
        console.log(chalk.yellow(message), error ?? "");
    }

    static success(message: string, error?: LitoError) {
        console.log(chalk.green(message), error ?? "");
    }

    static error(message: string, error?: LitoError) {
        console.log(chalk.red(message), error ?? "");
    }
}
