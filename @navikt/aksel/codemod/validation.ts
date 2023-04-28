import chalk from "chalk";
import { Command } from "commander";
import isGitClean from "is-git-clean";
import {
  getMigrationString,
  getMigrationNames,
  getMigrationPath,
} from "./migrations.js";

export function validateMigration(str: string, program: Command) {
  if (!getMigrationNames().includes(str)) {
    program.error(
      chalk.red(
        `Migration <${str}> not found!\n${chalk.gray(
          `\nAvailable migrations:\n${getMigrationString()}`
        )}`
      )
    );
  }
  const path = getMigrationPath(str);
  if (!path) {
    program.error(
      chalk.red(
        `Code for migration <${str}> not found!\n${chalk.gray(
          `\nContact creator (Aksel) to get it fixed!\n`
        )}`
      )
    );
  }
}

export function validateGit(options: any, program: Command) {
  if (options.dryRun) {
    return;
  }
  if (options.force) {
    console.log(chalk.yellow("Forcing migration without git check"));
    return;
  }

  let clean = false;

  try {
    clean = isGitClean.sync(process.cwd());
  } catch (err: any) {
    if (err && err.stderr && err.stderr.indexOf("Not a git repository") >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    program.error(
      `${chalk.yellow(
        "\nBefore we continue, please stash or commit your git changes."
      )}${"\nYou can use the --force flag to override this safety check."}`
    );
  }
}
