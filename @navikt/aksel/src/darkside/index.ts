import chalk from "chalk";
import { Command } from "commander";
// import figlet from "figlet";
// import { getMigrationString } from "./migrations.js";
import { runTooling } from "./run-tooling.js";
import { validateGit } from "./validation.js";

const program = new Command();

export function darksideCommand() {
  program.name(`${chalk.blueBright(`npx @navikt/aksel`)}`);

  program
    .option(
      "-g, --glob [glob]",
      "Globbing pattern, overrides --ext! Run with 'noglob' if using zsh-terminal. ",
    )
    .option("-d, --dry-run", "Dry run, no changes will be made")
    .option("-f, --force", "Forcibly run updates without checking git-changes")
    .command("darkside")
    // .addHelpText("beforeAll", figlet.textSync("Darkside"))
    // .addHelpText(
    //   "afterAll",
    //   chalk.gray(`\nAvailable migrations:\n${getMigrationString()}`),
    // )
    .description("Update tool for darkside token updates");

  program.parse();
  const options = program.opts();

  /* Makes sure that you dont migrate lots of file while having other uncommited changes */
  if (!options.force) {
    validateGit(options, program);
  }

  runTooling(options as Parameters<typeof runTooling>["0"], program);
}
