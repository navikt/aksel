import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { McpResource } from "../types.js";
import { docsIndexResource } from "./docs-index.js";
import { iconsCatalogResource } from "./icons-catalog.js";
import { migrationsCatalogResource } from "./migrations-catalog.js";
import { tokensCatalogResource } from "./tokens-catalog.js";

const resources: McpResource[] = [
  docsIndexResource,
  tokensCatalogResource,
  iconsCatalogResource,
  migrationsCatalogResource,
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
