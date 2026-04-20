import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import pkg from "../package.json" with { type: "json" };
import { prompts } from "./prompts/index.js";
import { tools } from "./tools/index.js";

const server = new McpServer({
  name: "aksel-mcp",
  version: pkg.version,
});

for (const tool of tools) {
  server.registerTool(
    tool.name,
    { description: tool.description, inputSchema: tool.inputSchema },
    tool.callback,
  );
}

for (const prompt of prompts) {
  server.registerPrompt(
    prompt.name,
    { description: prompt.description, argsSchema: prompt.argsSchema },
    prompt.callback,
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
