import { z } from "zod";
import { fetchWithTimeout } from "../helpers/fetch.js";
import { logError, logWarn } from "../helpers/log.js";
import { createNodeCache, oneHourSeconds } from "../helpers/node-cache.js";
import type { McpTool } from "../types.js";

const { cacheGet, cacheSet } = createNodeCache(
  "get_component_props",
  oneHourSeconds,
);

function normalizeComponentSlug(input: string) {
  return input.trim().replace(/^\/+/, "").replace(/\.md$/i, "");
}

const getComponentPropsInputSchema = {
  slug: z.string().trim().min(1, "Slug is required"),
};

const getComponentPropsTool: McpTool<typeof getComponentPropsInputSchema> = {
  name: "aksel_get_component_props",
  description: `Fetch the structured props API for an Aksel component by slug or docs path.

Returns all prop sets curated for that component (including sub-components like Button.Icon), with each prop's name, type, required status, description, default value, and deprecation notice.

Use this tool when you need to know exactly what props a component accepts for code generation. Combine with aksel_get_doc for usage guidance and accessibility notes.

Workflow:
1. Find the component path using aksel_find_docs or aksel-docs://index
2. Call this tool with either slug ('komponenter/core/button') or path ('/komponenter/core/button.md')

Example:
  aksel_get_component_props({ slug: "/komponenter/core/button.md" })`,
  inputSchema: getComponentPropsInputSchema,
  async callback({ slug }) {
    const normalizedSlug = normalizeComponentSlug(slug);

    if (!normalizedSlug) {
      return JSON.stringify({
        error: "INVALID_SLUG",
        message: "Slug must contain a valid component path.",
      });
    }

    const cachedContent = cacheGet(normalizedSlug);
    if (cachedContent) {
      return cachedContent;
    }

    const url = `https://aksel.nav.no/api/component-props?slug=${encodeURIComponent(normalizedSlug)}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      if (response.status === 404) {
        logWarn("Component props not found", {
          tool: "aksel_get_component_props",
          slug,
          normalizedSlug,
        });

        return JSON.stringify({
          error: "NOT_FOUND",
          message: `No props documentation found for input: "${slug}". Verify the path using aksel_find_docs or aksel-docs://index.`,
        });
      }

      logError("Failed to fetch component props", {
        tool: "aksel_get_component_props",
        slug: normalizedSlug,
        status: response.status,
        statusText: response.statusText,
      });

      throw new Error(
        `Failed to fetch component props: ${response.status} ${response.statusText}`,
      );
    }

    const content = JSON.stringify(await response.json());
    cacheSet(normalizedSlug, content);
    return content;
  },
};

export { getComponentPropsTool };
