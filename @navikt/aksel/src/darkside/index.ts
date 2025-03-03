import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import { getMigrationString } from "./migrations.js";
import { runTooling } from "./run-tooling.js";
import { validateGit, validateMigration } from "./validation.js";

const program = new Command();

export function darksideCommand() {
  program.name(`${chalk.blueBright(`npx @navikt/aksel`)}`);

  program
    .command("darkside")
    .addHelpText("beforeAll", figlet.textSync("Darkside"))
    .addHelpText(
      "afterAll",
      chalk.gray(`\nAvailable migrations:\n${getMigrationString()}`),
    )
    .description("Update tool for darkside token updates")
    .argument("<task>", "Task name")

    .option("-e, --ext [extension]", "default: js,ts,jsx,tsx,css,scss,less")
    .option(
      "-g, --glob [glob]",
      "Globbing pattern, overrides --ext! Run with 'noglob' if using zsh-terminal. ",
    )
    .option("-d, --dry-run", "Dry run, no changes will be made")
    .option("-f, --force", "Forcibly run updates without checking git-changes")
    .action((str, options) => {
      validateMigration(str, program);
      validateGit(options, program);
      runTooling(str, options, program);
    });

  program.parse();
}
