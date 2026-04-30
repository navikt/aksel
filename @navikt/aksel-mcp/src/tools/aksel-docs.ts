import { z } from "zod";
import type { McpTool } from "../types.js";

const getAkselDocs: McpTool<{ path: z.ZodString }> = {
  name: "aksel_docs",
  description: `Fetch Aksel official documentation by path.

IMPORTANT: You MUST first read the \`aksel-docs://llm-index\` MCP resource to get the correct path. Do NOT guess paths.

Workflow:
1. Read the \`aksel-docs://llm-index\` resource to get the documentation index
2. Find the relevant path in the index for what you're looking for
3. Call this tool with that exact path

Example:
  aksel_docs({ path: "/komponenter/core/button.md" })`,
  inputSchema: {
    path: z
      .string()
      .trim()
      .min(1, "Path is required")
      .startsWith("/", "Path must start with '/'")
      .endsWith(".md", "Path must end with '.md'")
      .describe(
        "Documentation path from the llm.md index (e.g., '/komponenter/core/button.md'). You MUST get this path from the aksel-docs://llm-index resource.",
      ),
  },
  async callback({ path }) {
    const url = `https://aksel.nav.no${path}`;

    const response = await fetch(url, {
      headers: {
        Accept: "text/markdown",
      },
    });

    if (!response.ok) {
      // If 404, suggest checking the index
      if (response.status === 404) {
        return JSON.stringify({
          error: "NOT_FOUND",
          message: `Documentation not found at path: "${path}". This path may be outdated. Please read the \`aksel-docs://llm-index\` resource to find the current correct path.`,
        });
      }
      throw new Error(
        `Failed to fetch documentation: ${response.status} ${response.statusText}`,
      );
    }

    const markdown = await response.text();

    return JSON.stringify({
      path,
      url,
      content: markdown,
    });
  },
};

export { getAkselDocs };
