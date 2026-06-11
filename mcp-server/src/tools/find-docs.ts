import { z } from "zod";
import { searchDocs } from "../helpers/fuse-search.js";
import type { McpTool } from "../types.js";

const findDocsInputSchema = {
  query: z
    .string()
    .trim()
    .min(1, "query is required")
    .describe(
      "Search query for documentation pages (e.g. 'button', 'form', 'tabs').",
    ),
  limit: z.number().int().min(1).max(20).optional().default(8),
};

const findDocsTool: McpTool<typeof findDocsInputSchema> = {
  name: "aksel_find_docs",
  description:
    "Find Aksel documentation pages by query and return matching docs paths. Use this before calling aksel_get_doc or aksel_get_component_info.",
  inputSchema: findDocsInputSchema,
  async callback({ query, limit }) {
    const searchResults = await searchDocs(query, limit);

    if (searchResults.length === 0) {
      return JSON.stringify({
        message: `No documentation pages found for query: "${query}"`,
        hint: "Try a broader keyword such as a component name or category.",
      });
    }

    return JSON.stringify(searchResults);
  },
};

export { findDocsTool };
