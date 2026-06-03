import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
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

function setupResources(server: McpServer) {
  for (const resource of resources) {
    server.registerResource(
      resource.name,
      resource.uri,
      { description: resource.description, mimeType: resource.mimeType },
      resource.callback,
    );
  }
}

export { setupResources };
