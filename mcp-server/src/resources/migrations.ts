import { migrations } from "@navikt/aksel/migrations";
import pkg from "../../package.json" with { type: "json" };
import type { McpResource } from "../types.js";

const URI = "aksel-migrations://list";
const MIME_TYPE = "application/json";

const migrationsResource: McpResource = {
  name: "Aksel Migrations List",
  uri: URI,
  description:
    "List all available Aksel codemods for migrating between major versions.",
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
                    warning: m.warning,
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
