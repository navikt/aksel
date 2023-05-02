import chalk from "chalk";
import figlet from "figlet";

export function helpCommand() {
  console.log(figlet.textSync("Aksel CLI"));
  console.log(`
📝 Documentation
   - ${chalk.blueBright(
     "https://aksel.nav.no/grunnleggende/kode/kommandolinje"
   )}

💻 Commands:
   - ${chalk.cyan(`npx @navikt/aksel ${chalk.green("css-imports")}`)}
   ✔︎ Helps with CSS imports for all Aksel components
   ✔︎ Supports Static and CDN-imports
   ✔︎ Handles cascading, tailwind and @layer rules

   - ${chalk.cyan(
     `npx @navikt/aksel ${chalk.green("codemod")} ${chalk.gray("<migration>")}`
   )}
   ✔︎ Code-transformations for breaking changes when updating Aksel
   ✔︎ Run ${chalk.cyan(
     `npx @navikt/aksel ${chalk.green("codemod")} --help`
   )} to get started!
`);
}
