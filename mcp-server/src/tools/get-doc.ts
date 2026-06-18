import { z } from "zod";
import { fetchWithTimeout } from "../helpers/fetch.js";
import { logError, logWarn } from "../helpers/log.js";
import { createNodeCache, oneHourSeconds } from "../helpers/node-cache.js";
import type { McpTool } from "../types.js";

const { cacheGet, cacheSet } = createNodeCache("get_doc", oneHourSeconds);

const getDocTool: McpTool<{ path: z.ZodString }> = {
  name: "aksel_get_doc",
  description: `Fetch official Aksel documentation by path.

IMPORTANT: Use \`aksel_find_docs\` (or \`aksel-docs://index\`) to get the correct path first. Do NOT guess paths.`,
  inputSchema: {
    path: z
      .string()
      .trim()
      .min(1, "Path is required")
      .startsWith("/", "Path must start with '/'")
      .endsWith(".md", "Path must end with '.md'")
      .describe(
        "Documentation path from aksel_find_docs or aksel-docs://index (e.g., '/komponenter/core/button.md').",
      ),
  },
  async callback({ path }) {
    const cachedContent = cacheGet(path);
    if (cachedContent) {
      return cachedContent;
    }

    const response = await fetchWithTimeout(`https://aksel.nav.no${path}`, {
      headers: {
        Accept: "text/markdown",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        logWarn("Documentation path not found", {
          tool: "aksel_get_doc",
          path,
        });

        return JSON.stringify({
          error: "NOT_FOUND",
          message: `Documentation not found at path: "${path}". This path may be outdated. Use aksel_find_docs or aksel-docs://index to find the current path.`,
        });
      }

      logError("Failed to fetch documentation", {
        tool: "aksel_get_doc",
        path,
        status: response.status,
        statusText: response.statusText,
      });

      throw new Error(
        `Failed to fetch documentation: ${response.status} ${response.statusText}`,
      );
    }

    const content = await response.text();

    cacheSet(path, content);
    return content;
  },
};

export { getDocTool };
