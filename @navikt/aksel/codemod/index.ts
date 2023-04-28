import { Command } from "commander";
import figlet from "figlet";
import fs from "fs";
import chalk from "chalk";
import { getMigrationString } from "./migrations.js";

const program = new Command();

export function codemodCommand() {
  const pkg = JSON.parse(fs.readFileSync("./package.json").toString()).version;

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
    .version(pkg)
    .parse(process.argv);

  program.opts();
}
