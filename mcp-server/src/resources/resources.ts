import type { McpResource } from "../types.js";
import { designTokensResource } from "./design-tokens.js";
import { iconCategoriesResource } from "./icon-categories.js";
import { llmIndexResource } from "./llm-index.js";
import { migrationsResource } from "./migrations.js";

const resources: McpResource[] = [
  llmIndexResource,
  designTokensResource,
  iconCategoriesResource,
  migrationsResource,
];

export { resources };
