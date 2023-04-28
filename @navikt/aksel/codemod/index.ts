import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { getMigrationString } from "./migrations.js";

const program = new Command();

export function codemodCommand() {
  program
    .name(`${chalk.blueBright(`npx @navikt/aksel codemod`)}`)
    .addHelpText("beforeAll", figlet.textSync("Aksel Codemods"))
    .addHelpText(
      "afterAll",
      chalk.gray(`\nAvailable migrations:\n${getMigrationString()}`)
    )
    .description("Migrations for Aksel components and more")
    .option(
      "-p, --path [name]",
      "Files or directory to transform. Can be a globby: '**/*.css'"
    )
    .option("-m, --migration [name]", "Migration to run")
    .option("-d, --dry-run", "Dry run, no changes will be made")
    .option("-p, --print", "Print transformed files")
    .option(
      "-f, --force",
      "Forcibly run migrations without checking git-changes"
    )
    .parse(process.argv);

  program.opts();
}
