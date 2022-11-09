import meow, { AnyFlags } from "meow";

import { migrate } from "./migrate";
import { cliConfig } from "./config";

const help = `
Usage
  $ npx @navikt/ds-codemod ${cliConfig.args
    .map((arg) => `<${arg.name}>`)
    .join(" ")}
  ${cliConfig.args.map((arg) => `${arg.name}\t${arg.description}`).join("\n  ")}
Options
  ${Object.entries(cliConfig.flags)
    .map(([name, val]: [string, any]) => `--${name}\t${val.description}`)
    .join("\n  ")}
`;

const { input, flags } = meow({
  description: cliConfig.description,
  flags: Object.fromEntries(
    Object.entries(cliConfig.flags).map(
      ([name, flag]: [string, any]): [string, AnyFlags] => [
        name,
        {
          alias: flag.alias,
          type: flag.type,
        },
      ]
    )
  ),
  help,
});

export async function run() {
  await migrate(input[0], input[1], flags);
}
