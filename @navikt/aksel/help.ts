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
`);
}
