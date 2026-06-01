import { migrations } from "@navikt/aksel/migrations";
import pkg from "../../package.json" with { type: "json" };
import type { McpResource } from "../types.js";

const URI = "aksel-migrations://list";
const MIME_TYPE = "application/json";

const migrationsResource: McpResource = {
  name: "Aksel Migrations List",
  uri: URI,
  description: `List all available Aksel codemods for migrating between major versions.

Returns every migration with its name, description, optional warning (manual steps), and the CLI command to run it.

Run a migration with:
  npx @navikt/aksel codemod <name>

CLI flags: -e <ext> · -g <glob> · -d (dry-run) · -p (print output) · -f (force, skip git check)`,
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify(
            {
              cliVersion: pkg.version,
              runCommand: "npx @navikt/aksel codemod <name>",
              migrations: Object.fromEntries(
                Object.entries(migrations).map(([version, entries]) => [
                  version,
                  entries.map((m) => ({
                    name: m.value,
                    description: m.description,
                    ...(m.warning !== undefined ? { warning: m.warning } : {}),
                  })),
                ]),
              ),
            },
            null,
            2,
          ),
        },
      ],
    };
  },
};

export { migrationsResource };
