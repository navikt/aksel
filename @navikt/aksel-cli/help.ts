import chalk from "chalk";

console.log(`
✨ Aksel client-tool
📝 Documentation
   - ${chalk.blueBright(
     "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-client/README.md"
   )}

💻 Commands:
   - ${chalk.cyan(`npx @navikt/aksel-client ${chalk.green("css-imports")}`)}
   ✔︎ Helps with adding CSS imports for all Aksel-components
   ✔︎ Supports Static and CDN-imports
   ✔︎ Handles cascading, talwind and @layer rules
`);
