import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ShapeOutput } from "@modelcontextprotocol/sdk/server/zod-compat";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import type {
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types";
import pkg from "../package.json" with { type: "json" };
import { prompts } from "./prompts/prompts.js";
import { resources } from "./resources/resources.js";
import { tools } from "./tools/tools.js";

const server = new McpServer({
  name: "aksel-mcp",
  version: pkg.version,
});

for (const tool of tools) {
  server.registerTool(
    tool.name,
    { description: tool.description, inputSchema: tool.inputSchema },
    async (args: RequestHandlerExtra<ServerRequest, ServerNotification>) => {
      const result = await tool.callback(args);

      return {
        content: [
          {
            type: "text" as const,
            text: result,
          },
        ],
      };
    },
  );
}

for (const prompt of prompts) {
  server.registerPrompt(
    prompt.name,
    { description: prompt.description, argsSchema: prompt.argsSchema },
    async (args: ShapeOutput<any>) => {
      const result = await prompt.callback(args);

      return {
        messages: [
          {
            /* TODO: Might need to allow for role: "assistant" as option */
            role: "user" as const,
            content: {
              type: "text" as const,
              text: result,
            },
          },
        ],
      };
    },
  );
}

for (const resource of resources) {
  server.registerResource(
    resource.name,
    resource.uri,
    { description: resource.description, mimeType: resource.mimeType },
    resource.callback,
  );
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Aksel MCP Server running on stdio");

  function shutdown() {
    console.error("Server terminated");

    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
