import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import { getMigrationString, getVersionKeys } from "./migrations.js";
import { runCodeshift } from "./run-codeshift.js";
import {
  runVersionMigration,
  validateVersion,
} from "./run-version-migration.js";
import { validateGit, validateMigration } from "./validation.js";

const program = new Command();

export function codemodCommand(
  overrideHandler?: (migration: string) => Promise<void> | void,
) {
  program.name(`${chalk.blueBright(`npx @navikt/aksel`)}`);

  program
    .command("codemod")
    .addHelpText("beforeAll", figlet.textSync("Codemods"))
    .addHelpText(
      "afterAll",
      chalk.gray(`\nAvailable migrations:\n${getMigrationString()}`),
    )
    .description("Migrations for Aksel components and more")
    .argument("<migration>", "Migration name or version (e.g. v8)")

    .option("-e, --ext [extension]", "default: js,ts,jsx,tsx,css,scss,less")
    .option(
      "-g, --glob [glob]",
      "Globbing pattern, overrides --ext! Run with 'noglob' if using zsh-terminal. ",
    )
    .option("-d, --dry-run", "Dry run, no changes will be made")
    .option("-p, --print", "Print transformed files")
    .option(
      "-f, --force",
      "Forcibly run migrations without checking git-changes",
    )
    .addHelpText(
      "after",
      `\nExample:
  $ npx @navikt/aksel codemod --dry-run v2-css
  $ npx @navikt/aksel codemod v8  # Interactive selection for version`,
    )
    .action(async (str, options) => {
      const versionKeys = getVersionKeys();

      /* Check if the argument is a version key for interactive selection */
      if (versionKeys.includes(str)) {
        validateVersion(str, program);
        await runVersionMigration(str, options, program, overrideHandler);
        return;
      }

      /* Otherwise, treat it as a specific migration name */
      validateMigration(str, program);
      validateGit(options, program);
      runCodeshift(str, options, program);
    });

  program.parse();
}
