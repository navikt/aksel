import chalk from "chalk";
import type { Command } from "commander";
import isGitClean from "is-git-clean";
import {
  getMigrationNames,
  getMigrationPath,
  getMigrationString,
} from "./migrations.js";

export function validateMigration(str: string, program: Command) {
  if (!getMigrationNames().includes(str)) {
    program.error(
      chalk.red(
        `Migration <${str}> not found!\n${chalk.gray(
          `\nAvailable migrations:\n${getMigrationString()}`,
        )}`,
      ),
    );
  }
  const path = getMigrationPath(str);
  if (!path) {
    program.error(
      chalk.red(
        `Code for migration <${str}> not found!\n${chalk.gray(
          `\nContact creator (Aksel) to get it fixed!\n`,
        )}`,
      ),
    );
  }
}

export function validateGit(options: any, program: Command) {
  if (options.dryRun) {
    return;
  }
  if (options.force) {
    console.info(chalk.yellow("Forcing migration without git check"));
    return;
  }

  let clean = false;

  try {
    clean = isGitClean.sync(process.cwd());
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      program.error(
        `${chalk.yellow(
          "\nCould not find git, so we can't check for uncommitted changes.",
        )}${"\nInstall git, or use the --force flag to override this safety check."}`,
      );
    }
    if (/not a git repository/i.test(String(err?.stderr ?? ""))) {
      clean = true;
    }
  }

  if (!clean) {
    program.error(
      `${chalk.yellow(
        "\nBefore we continue, please stash or commit your git changes.",
      )}${"\nYou can use the --force flag to override this safety check."}`,
    );
  }
}
