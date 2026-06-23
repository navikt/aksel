import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { McpPrompt } from "../types.js";

const prompts: McpPrompt[] = [];

function setupPrompts(server: McpServer) {
  for (const prompt of prompts) {
    server.registerPrompt(
      prompt.name,
      { description: prompt.description, argsSchema: prompt.argsSchema },
      async (args: { [K in keyof typeof prompt.argsSchema]: any }) => {
        const result = await prompt.callback(args);

        return {
          messages: [
            {
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
}

export { setupPrompts };
