#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs";
import { codemodCommand } from "./codemod/index";
import { darksideCommand } from "./darkside";
import { helpCommand } from "./help";

run();

async function run() {
  const pkg = JSON.parse(fs.readFileSync("./package.json").toString()).version;

  const program = new Command();
  program.version(pkg, "-v, --version");
  program.allowUnknownOption().helpOption(false);

  program.parse();

  const args = program.args;

  if (args.length === 0 || args[0] === "help") {
    helpCommand();
    return;
  }

  if (args[0] === "codemod") {
    if (args.includes("v8-tokens")) {
      darksideCommand();
      return;
    }

    codemodCommand();
    return;
  }

  console.info(
    chalk.red(
      `Unknown command: ${args[0]}.\nRun ${chalk.cyan(
        "npx @navikt/aksel help",
      )} for all available commands.`,
    ),
  );
}
