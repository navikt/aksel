import { z } from "zod";
import { searchDocs } from "../helpers/fuse-search.js";
import type { McpTool } from "../types.js";

const findDocsInputSchema = {
  query: z
    .string()
    .trim()
    .min(1, "query is required")
    .describe(
      "Keywords describing the page you want. Prefer one or two words; component names work best (e.g. 'button', 'knapp', 'textfield', 'tailwind'). Avoid long sentences.",
    ),
  limit: z.number().int().min(1).max(20).optional().default(8),
};

const findDocsTool: McpTool<typeof findDocsInputSchema> = {
  name: "aksel_find_docs",
  description:
    "Search Aksel documentation pages (components, patterns, guides) and return matching paths. Accepts multi-word and Norwegian/English queries. Call this before aksel_get_doc / aksel_get_component_info. NOTE: this searches pages — for design tokens use aksel_get_token_details/aksel-tokens://catalog, and for version migrations use aksel_find_migrations/aksel-migrations://catalog. If a query returns no results, retry with a single keyword (e.g. a component name) before falling back.",
  inputSchema: findDocsInputSchema,
  async callback({ query, limit }) {
    const searchResults = await searchDocs(query, limit);

    if (searchResults.length === 0) {
      return JSON.stringify({
        message: `No documentation pages found for query: "${query}"`,
        hint: "Try a broader keyword such as a component name or category.",
      });
    }

    return JSON.stringify({
      query,
      results: searchResults,
    });
  },
};

export { findDocsTool };
