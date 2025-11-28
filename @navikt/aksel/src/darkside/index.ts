import chalk from "chalk";
import { Command } from "commander";
import { runTooling } from "./run-tooling.js";

const program = new Command();

export function darksideCommand() {
  program.name(`${chalk.blueBright(`npx @navikt/aksel v8-tokens`)}`);

  program
    .option(
      "-g, --glob [glob]",
      "Globbing pattern, overrides --ext! Run with 'noglob' if using zsh-terminal. ",
    )
    .option(
      "-e, --ext [ext]",
      "File extensions to include, defaults to 'js,ts,jsx,tsx,css,scss,less'",
    )
    .option("-d, --dry-run", "Dry run, no changes will be made")
    .option("-f, --force", "Forcibly run updates without checking git-changes")
    .description("Update tool for v8 token updates");

  program.parse();
  const options = program.opts();

  runTooling(options as Parameters<typeof runTooling>["0"], program);
}
