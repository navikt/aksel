import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { getMigrationString } from "./migrations.js";
import { validateGit, validateMigration } from "./validation.js";

const program = new Command();

export function codemodCommand() {
  program.name(`${chalk.blueBright(`npx @navikt/aksel`)}`);

  program
    .command("codemod")
    .addHelpText("beforeAll", figlet.textSync("Codemods"))
    .addHelpText(
      "afterAll",
      chalk.gray(`\nAvailable migrations:\n${getMigrationString()}`)
    )
    .description("Migrations for Aksel components and more")
    .argument("<migration>", "Migration name")

    .option("-g, --glob [glob]", "Files to transform. Can be a globby!")
    .option("-d, --dry-run", "Dry run, no changes will be made")
    .option("-p, --print", "Print transformed files")
    .option(
      "-f, --force",
      "Forcibly run migrations without checking git-changes"
    )
    .addHelpText(
      "after",
      `\nExample:
  $ npx @navikt/aksel --dry-run v2-css`
    )
    .action((str, options) => {
      validateMigration(str, program);
      validateGit(options, program);

      /* console.log({ str, options }); */
    });

  program.parse();
}
