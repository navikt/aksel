import { z } from "zod";
import { createNodeCache, oneHourSeconds } from "../lib/node-cache.js";
import type { McpTool } from "../types.js";

const componentPropsCache = createNodeCache(oneHourSeconds);

const componentPropsInputSchema = {
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .refine((value) => !value.startsWith("/"), {
      message: "Slug must not start with '/'",
    })
    .refine((value) => !value.endsWith(".md"), {
      message: "Slug must not end with '.md'",
    }),
};

const componentPropsTool: McpTool<typeof componentPropsInputSchema> = {
  name: "aksel_component_props",
  description: `Fetch the structured props API for an Aksel component by slug.

Returns all prop sets curated for that component (including sub-components like Button.Icon), with each prop's name, type, required status, description, default value, and deprecation notice.

Use this tool when you need to know exactly what props a component accepts for code generation. Combine with aksel_docs for usage guidance and accessibility notes.

Workflow:
1. Read the aksel-docs://llm-index resource to find the component slug
2. Strip the leading '/' and trailing '.md' from the path (e.g., '/komponenter/core/button.md' → 'komponenter/core/button')
3. Call this tool with that slug

Example:
  aksel_component_props({ slug: "komponenter/core/button" })`,
  inputSchema: componentPropsInputSchema,
  async callback({ slug }) {
    const cachedContent = componentPropsCache.get<string>(slug);
    if (cachedContent) {
      return cachedContent;
    }

    const url = `https://aksel.nav.no/api/component-props?slug=${encodeURIComponent(slug)}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return JSON.stringify({
          error: "NOT_FOUND",
          message: `No props documentation found for slug: "${slug}". Verify the slug using the aksel-docs://llm-index resource.`,
        });
      }

      throw new Error(
        `Failed to fetch component props: ${response.status} ${response.statusText}`,
      );
    }

    const content = JSON.stringify(await response.json());
    componentPropsCache.set(slug, content);
    return content;
  },
};

export { componentPropsTool };
