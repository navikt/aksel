import { z } from "zod";
import { fetchWithTimeout } from "../helpers/fetch.js";
import { logError, logWarn } from "../helpers/log.js";
import { createNodeCache, oneHourSeconds } from "../helpers/node-cache.js";
import type { McpTool } from "../types.js";

const { cacheGet, cacheSet } = createNodeCache("aksel_docs", oneHourSeconds);

const getAkselDocs: McpTool<{ path: z.ZodString }> = {
  name: "aksel_docs",
  description: `Fetch Aksel official documentation by path.

IMPORTANT: You MUST first read the \`aksel-docs://llm-index\` MCP resource to get the correct path. Do NOT guess paths.`,
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
    const cachedContent = cacheGet(path);
    if (cachedContent) {
      return cachedContent;
    }

    const url = `https://aksel.nav.no${path}`;
    const response = await fetchWithTimeout(url, {
      headers: {
        Accept: "text/markdown",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        logWarn("Documentation path not found", {
          tool: "aksel_docs",
          path,
        });

        return JSON.stringify({
          error: "NOT_FOUND",
          message: `Documentation not found at path: "${path}". This path may be outdated. Please read the \`aksel-docs://llm-index\` resource to find the current correct path.`,
        });
      }

      logError("Failed to fetch documentation", {
        tool: "aksel_docs",
        path,
        status: response.status,
        statusText: response.statusText,
      });

      throw new Error(
        `Failed to fetch documentation: ${response.status} ${response.statusText}`,
      );
    }

    const content = JSON.stringify({
      path,
      url,
      content: await response.text(),
    });

    cacheSet(path, content);
    return content;
  },
};

export { getAkselDocs };
