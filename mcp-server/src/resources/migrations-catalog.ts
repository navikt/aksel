import { migrations } from "@navikt/aksel/migrations";
import pkg from "../../package.json" with { type: "json" };
import type { McpResource } from "../types.js";

const URI = "aksel-migrations://catalog";
const MIME_TYPE = "application/json";

const migrationsCatalogResource: McpResource = {
  name: "Aksel Migrations Catalog",
  uri: URI,
  description:
    "Catalog of available Aksel codemods for migrating between major versions.",
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify({
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
          }),
        },
      ],
    };
  },
};

export { migrationsCatalogResource };
