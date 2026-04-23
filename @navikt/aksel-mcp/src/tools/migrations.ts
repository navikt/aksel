import { migrationDocs } from "@navikt/aksel/migrations";
import type { McpTool } from "../types.js";

const migrationsTool: McpTool<Record<string, never>> = {
  name: "aksel_migrations",
  description:
    "Returns all available Aksel codemods and migration. Use this to help developers upgrade between major Aksel versions.",
  inputSchema: {},
  async callback() {
    return migrationDocs();
  },
};

export { migrationsTool };
