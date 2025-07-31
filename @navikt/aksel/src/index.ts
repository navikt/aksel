#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import { codemodCommand } from "./codemod/index";
import { cssImportsCommand } from "./css-imports/index";
import { darksideCommand } from "./darkside";
import { helpCommand } from "./help";

run();

async function run() {
  if (!process.argv[2] || process.argv[2] === "help") {
    helpCommand();
    return;
  }

  if (process.argv[2] === "css-imports") {
    await cssImportsCommand();
    return;
  }

  if (process.argv[2] === "codemod") {
    codemodCommand();
    return;
  }

  if (process.argv[2] === "darkside") {
    darksideCommand();
    return;
  }

  if (process.argv[2] === "-v" || process.argv[2] === "--version") {
    const pkg = JSON.parse(
      fs.readFileSync("./package.json").toString(),
    ).version;
    console.info(pkg);
    return;
  }

  console.info(
    chalk.red(
      `Unknown command: ${process.argv[2]}.\nRun ${chalk.cyan(
        "npx @navikt/aksel help",
      )} for all available commands.`,
    ),
  );
}
