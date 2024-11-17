#!/usr/bin/env bun
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const classModule = require("../dist/orm/models");

const workingDir = path.join(process.cwd(), "apps");

// loop through all the apps
const apps = fs.readdirSync(workingDir);
apps.forEach(async (app) => {
    // check if its a folder
    const appPath = path.join(workingDir, app);
    const stats = fs.statSync(appPath);
    if (!stats.isDirectory()) {
        return;
    }

    // check if the models file exists
    const modelsPath = path.join(appPath, "models.ts");
    if (!fs.existsSync(modelsPath)) {
        return;
    }

    // Import the models file
    const models = await import(modelsPath);

    for (const key in models) {
        console.log(models[key]);
    }
});
