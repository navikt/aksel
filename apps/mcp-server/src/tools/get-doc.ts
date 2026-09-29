import { z } from "zod";
import { fetchWithTimeout } from "../helpers/fetch.js";
import { logError, logWarn } from "../helpers/log.js";
import { createNodeCache, oneHourSeconds } from "../helpers/node-cache.js";
import type { McpTool } from "../types.js";

const { cacheGet, cacheSet } = createNodeCache("get_doc", oneHourSeconds);

const docsOrigin = "https://aksel.nav.no";

/* Only plain lowercase path segments. Rejects "?", "#", "%", "..", "//" and similar. */
const docPathPattern = /^(?:\/[a-z0-9-]+)+\.md$/;

/**
 * Builds the docs URL and makes sure it cannot point anywhere other than
 * the requested markdown path on aksel.nav.no.
 */
function toDocUrl(path: string) {
  const url = new URL(path, docsOrigin);

  if (
    url.origin !== docsOrigin ||
    url.pathname !== path ||
    url.search !== "" ||
    url.hash !== ""
  ) {
    return null;
  }

  return url;
}

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
      .max(200, "Path must be at most 200 characters")
      .regex(
        docPathPattern,
        "Path must only contain lowercase letters, numbers, '-' and '/'",
      )
      .describe(
        "Documentation path from aksel_find_docs or aksel-docs://index (e.g., '/komponenter/core/button.md').",
      ),
  },
  async callback({ path }) {
    const cachedContent = cacheGet(path);
    if (cachedContent) {
      return cachedContent;
    }

    const url = toDocUrl(path);

    if (!url) {
      return JSON.stringify({
        error: "INVALID_PATH",
        message: `Invalid documentation path: "${path}". Use aksel_find_docs or aksel-docs://index to find a valid path.`,
      });
    }

    const response = await fetchWithTimeout(url, {
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

    if (!response.headers.get("content-type")?.startsWith("text/markdown")) {
      logWarn("Documentation path did not return markdown", {
        tool: "aksel_get_doc",
        path,
        contentType: response.headers.get("content-type"),
      });

      return JSON.stringify({
        error: "NOT_FOUND",
        message: `No markdown documentation at path: "${path}". Use aksel_find_docs or aksel-docs://index to find the current path.`,
      });
    }

    const content = await response.text();

    cacheSet(path, content);
    return content;
  },
};

export { getDocTool };
