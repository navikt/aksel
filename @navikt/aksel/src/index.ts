#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import { codemodCommand } from "./codemod/index";
import { cssImportsCommand } from "./css-imports/index";
import { helpCommand } from "./help";

run();

async function run() {
  if (!process.argv[2] || process.argv[2] === "help") {
    helpCommand();
    return;
  } else if (process.argv[2] === "css-imports") {
    await cssImportsCommand();
    return;
  } else if (process.argv[2] === "codemod") {
    codemodCommand();
    return;
  } else if (process.argv[2] === "-v" || process.argv[2] === "--version") {
    const pkg = JSON.parse(
      fs.readFileSync("./package.json").toString(),
    ).version;
    console.log(pkg);
    return;
  } else {
    console.log(
      chalk.red(
        `Unknown command: ${process.argv[2]}.\nRun ${chalk.cyan(
          "npx @navikt/aksel help",
        )} for all available commands.`,
      ),
    );
  }
}
