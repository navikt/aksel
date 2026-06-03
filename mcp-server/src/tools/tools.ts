import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { logError } from "../helpers/log.js";
import { recordToolCall } from "../helpers/metrics.js";
import type { McpTool } from "../types.js";
import { getAkselDocs } from "./aksel-docs.js";
import { componentPropsTool } from "./component-props.js";
import { iconSearchTool } from "./icon-search.js";
import { tokenDetailsTool } from "./token-details.js";

const tools: McpTool<any>[] = [
  getAkselDocs,
  tokenDetailsTool,
  iconSearchTool,
  componentPropsTool,
];

function setupTools(server: McpServer) {
  for (const tool of tools) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
        annotations: { readOnlyHint: true },
      },
      async (args: { [K in keyof typeof tool.inputSchema]: any }) => {
        const started = performance.now();

        try {
          const result = await tool.callback(args);
          recordToolCall(tool.name, "ok", (performance.now() - started) / 1000);

          return {
            content: [
              {
                type: "text" as const,
                text: result,
              },
            ],
          };
        } catch (error) {
          recordToolCall(
            tool.name,
            "error",
            (performance.now() - started) / 1000,
          );
          logError("Tool execution failed", {
            tool: tool.name,
            error: error instanceof Error ? error.message : String(error),
          });
          throw error;
        }
      },
    );
  }
}

export { setupTools };
