import chalk from "chalk";
import figlet from "figlet";

export function helpCommand() {
  console.info(figlet.textSync("Aksel CLI"));
  console.info(`
📝 Documentation
   - ${chalk.blueBright(
     "https://aksel.nav.no/grunnleggende/kode/kommandolinje",
   )}

💻 Commands:
   - ${chalk.cyan(
     `npx @navikt/aksel ${chalk.green("codemod")} ${chalk.gray("<migration>")}`,
   )}
   ✔︎ Code-transformations for breaking changes when updating Aksel
   ✔︎ Run with ${chalk.cyan(`${chalk.green("--help")}`)} to get started!

   - ${chalk.cyan(
     `npx @navikt/aksel ${chalk.green("darkside")} ${chalk.gray("<task>")}`,
   )}
   ✔︎ Tooling for migrating to the darkside
   ✔︎ Check current status and migrate tokens
   ✔︎ Run with ${chalk.cyan(`${chalk.green("--help")}`)} to get started!
`);
}
