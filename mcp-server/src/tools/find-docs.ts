import { z } from "zod";
import {
  type DocsIndexEntry,
  getDocsIndex,
} from "../helpers/docs-index-client.js";
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
    const index = await getDocsIndex();
    const normalizedQuery = query.toLowerCase();

    const matches = index.entries
      .map((entry) => ({
        ...entry,
        score: scoreEntry(entry, normalizedQuery),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

    if (matches.length === 0) {
      return JSON.stringify({
        message: `No documentation pages found for query: "${query}"`,
        hint: "Try a broader keyword such as a component name or category.",
      });
    }

    return JSON.stringify({
      query,
      totalMatches: matches.length,
      returned: Math.min(matches.length, limit),
      results: matches.slice(0, limit).map((entry) => ({
        name: entry.name,
        path: entry.path,
        category: entry.category,
        subcategory: entry.subcategory,
      })),
    });
  },
};

function scoreEntry(entry: DocsIndexEntry, normalizedQuery: string) {
  const name = entry.name.toLowerCase();
  const path = entry.path.toLowerCase();
  const category = entry.category.toLowerCase();
  const subcategory = entry.subcategory.toLowerCase();

  if (name === normalizedQuery || path === normalizedQuery) {
    return 100;
  }

  if (name.startsWith(normalizedQuery)) {
    return 90;
  }

  if (name.includes(normalizedQuery)) {
    return 80;
  }

  if (path.includes(normalizedQuery)) {
    return 70;
  }

  if (
    category.includes(normalizedQuery) ||
    subcategory.includes(normalizedQuery)
  ) {
    return 40;
  }

  return 0;
}

export { findDocsTool };
