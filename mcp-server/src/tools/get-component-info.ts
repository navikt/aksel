import { z } from "zod";
import { fetchWithTimeout } from "../helpers/fetch.js";
import { logError, logWarn } from "../helpers/log.js";
import { createNodeCache, oneHourSeconds } from "../helpers/node-cache.js";
import type { McpTool } from "../types.js";

const { cacheGet, cacheSet } = createNodeCache(
  "get_component_info_props",
  oneHourSeconds,
);

function normalizeComponentSlug(input: string) {
  return input.trim().replace(/^\/+/, "").replace(/\.md$/i, "");
}

/**
 * TODO: Future features:
 * - add support for fetching examples
 *
 *
 * Currently returns component props only.
 * TODO: Add examples (and an `include` option) when API exists.
 */
const getComponentInfoInputSchema = {
  component: z
    .string()
    .trim()
    .min(1, "Component is required")
    .describe(
      "Component slug or docs path (e.g. 'komponenter/core/button' or '/komponenter/core/button.md').",
    ),
  /* include: z.enum(["props", "examples", "both"]).optional().default("props"), */
};

const getComponentInfoTool: McpTool<typeof getComponentInfoInputSchema> = {
  name: "aksel_get_component_info",
  description: `Fetch structured information for an Aksel component by slug or docs path.

Workflow:
1. Find the component path using aksel_find_docs or aksel-docs://index
2. Call this tool with either slug ('komponenter/core/button') or path ('/komponenter/core/button.md')

Example: aksel_get_component_info({ component: "/komponenter/core/button.md" })`,
  inputSchema: getComponentInfoInputSchema,
  async callback({ component }) {
    const normalizedComponent = normalizeComponentSlug(component);

    if (!normalizedComponent) {
      return JSON.stringify({
        error: "INVALID_COMPONENT",
        message: "component must contain a valid component path.",
      });
    }

    let props: unknown | null;

    const cachedContent = cacheGet(normalizedComponent);
    if (cachedContent) {
      props = JSON.parse(cachedContent);
    } else {
      const url = `https://aksel.nav.no/api/component-props?slug=${encodeURIComponent(normalizedComponent)}`;
      const response = await fetchWithTimeout(url);

      if (!response.ok) {
        if (response.status === 404) {
          logWarn("Component info not found", {
            tool: "aksel_get_component_info",
            component,
            normalizedComponent,
          });

          return JSON.stringify({
            error: "NOT_FOUND",
            message: `No component info found for input: "${component}". Verify the path using aksel_find_docs or aksel-docs://index.`,
          });
        }

        logError("Failed to fetch component info", {
          tool: "aksel_get_component_info",
          component: normalizedComponent,
          status: response.status,
          statusText: response.statusText,
        });

        throw new Error(
          `Failed to fetch component info: ${response.status} ${response.statusText}`,
        );
      }

      props = await response.json();
      cacheSet(normalizedComponent, JSON.stringify(props));
    }

    return JSON.stringify({
      component: normalizedComponent,
      props,
    });
  },
};

export { getComponentInfoTool };
