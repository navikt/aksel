import chalk from "chalk";

console.log(`
✨ Aksel client-tool
📝 Documentation
   - ${chalk.blueBright(
     "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-icons/README.md"
   )}

💻 Commands:
   - ${chalk.cyan(`npx @navikt/aksel-client ${chalk.green("css-imports")}`)}
   ✔︎ Helps with CSS imports for all Aksel-components
   ✔︎ Supports Static and CDN-imports
`);
