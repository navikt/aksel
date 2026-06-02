import type { McpResource } from "../types.js";
import { designTokensResource } from "./design-tokens.js";
import { iconCategoriesResource } from "./icon-categories.js";
import { llmIndexResource } from "./llm-index.js";
import { migrationsResource } from "./migrations.js";

/**
 * Register all resources here.
 * Each resource should be an object that conforms to the McpResource interface, with a unique name, URI, and callback function.
 *
 * Read more about resources:
 * - https://modelcontextprotocol.io/docs/learn/server-concepts#resources
 */
const resources: McpResource[] = [
  llmIndexResource,
  designTokensResource,
  iconCategoriesResource,
  migrationsResource,
];

export { resources };
