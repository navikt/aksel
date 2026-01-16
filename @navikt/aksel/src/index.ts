#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { codemodCommand } from "./codemod/index";
import { v8TokensCommand } from "./codemod/v8-tokens";
import { helpCommand } from "./help";
import { VERSION } from "./version";

run();

async function run() {
  let program = new Command();
  program.version(VERSION, "-v, --version");
  program = program
    .allowUnknownOption()
    .allowExcessArguments()
    .helpOption(false);

  program.parse();

  const args = program.args;

  if (args.length === 0 || args[0] === "help") {
    helpCommand();
    return;
  }

  if (args[0] === "codemod") {
    if (args.includes("v8-tokens")) {
      v8TokensCommand();
      return;
    }

    codemodCommand((migration) => {
      if (migration === "v8-tokens") {
        v8TokensCommand();
      }
    });
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
