import type { McpTool } from "../types.js";
import { getAkselDocs } from "./aksel-docs.js";
import { iconSearchTool } from "./icon-search.js";
import { akselMigrationsTool } from "./migrations.js";
import { tokenDetailsTool } from "./token-details.js";

/**
 * Register all tools here.
 * Each tool should be an object that conforms to the McpTool interface, with a unique name, description, input schema, and callback function.
 *
 *
 * Read more about tools:
 * - https://modelcontextprotocol.io/docs/learn/server-concepts#tools
 */
const tools: McpTool<any>[] = [
  getAkselDocs,
  tokenDetailsTool,
  iconSearchTool,
  akselMigrationsTool,
];

export { tools };
