#!/usr/bin/env node
import chalk from "chalk";
import { helpCommand } from "./help.js";
import { cssImportsCommand } from "./css-imports/index.js";
import { codemodCommand } from "./codemod/index.js";

run();

async function run() {
  if (!process.argv[2] || process.argv[2] === "help") {
    helpCommand();
    return;
  } else if (process.argv[2] === "css-imports") {
    await cssImportsCommand();
    return;
  } else if (process.argv[2] === "codemod") {
    await codemodCommand();
    return;
  } else {
    console.log(
      chalk.red(
        `Unknown command: ${process.argv[2]}.\nRun ${chalk.cyan(
          "npx @navikt/aksel help"
        )} for all available commands.`
      )
    );
  }
}
