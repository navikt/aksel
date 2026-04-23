import { migrations } from "@navikt/aksel/migrations";
import pkg from "../../package.json" with { type: "json" };
import type { McpTool } from "../types.js";

const migrationsInputSchema = {};

const akselMigrationsTool: McpTool<typeof migrationsInputSchema> = {
  name: "aksel_migrations",
  description: `List all available Aksel codemods for migrating between major versions.

Returns every migration with its name, description, optional warning (manual steps), and the CLI command to run it.

Run a migration with:
  npx @navikt/aksel codemod <name>

CLI flags: -e <ext> · -g <glob> · -d (dry-run) · -p (print output) · -f (force, skip git check)`,
  inputSchema: migrationsInputSchema,
  async callback() {
    return JSON.stringify(
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
    );
  },
};

export { akselMigrationsTool };
