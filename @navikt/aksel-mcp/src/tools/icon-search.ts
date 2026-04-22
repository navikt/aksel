import { z } from "zod";
import { metadata } from "../resources/icon-categories.js";
import type { McpTool } from "../types.js";

const iconSearchInputSchema = {
  category: z
    .string()
    .optional()
    .describe(
      "Filter by main category (e.g., 'Interface', 'Arrows', 'People'). Use aksel-icons://categories resource to see all available categories.",
    ),
  subcategory: z
    .string()
    .optional()
    .describe(
      "Filter by subcategory (e.g., 'Communication', 'Arrow', 'Body parts')",
    ),
  keyword: z
    .string()
    .optional()
    .describe(
      "Search by keyword (e.g., 'chat', 'calendar', 'arrow'). Matches against icon keywords and names.",
    ),
  variant: z
    .enum(["Stroke", "Fill", "both"])
    .optional()
    .default("both")
    .describe("Filter by icon variant: Stroke, Fill, or both"),
  limit: z
    .number()
    .optional()
    .default(20)
    .describe("Maximum number of results to return (default: 20, max: 100)"),
};

const iconSearchTool: McpTool<typeof iconSearchInputSchema> = {
  name: "aksel_icons_search",
  description:
    "Search and filter Aksel icons by category, subcategory, keywords, or name. Returns icon names with metadata. Use this after checking aksel-icons://categories to scope your search.",
  inputSchema: iconSearchInputSchema,
  async callback({ category, subcategory, keyword, variant, limit }) {
    const maxLimit = Math.min(limit || 20, 100);
    const icons = Object.values(metadata);

    let filtered = icons;

    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (icon) => icon.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Filter by subcategory
    if (subcategory) {
      filtered = filtered.filter(
        (icon) => icon.sub_category.toLowerCase() === subcategory.toLowerCase(),
      );
    }

    // Filter by keyword (fuzzy match on keywords array and name)
    if (keyword) {
      const searchTerm = keyword.toLowerCase();
      filtered = filtered.filter(
        (icon) =>
          icon.name.toLowerCase().includes(searchTerm) ||
          icon.keywords.some((kw) => kw.toLowerCase().includes(searchTerm)),
      );
    }

    // Filter by variant
    if (variant && variant !== "both") {
      filtered = filtered.filter(
        (icon) => icon.variant === variant.toLowerCase(),
      );
    }

    // Limit results
    const results = filtered.slice(0, maxLimit);

    if (results.length === 0) {
      return JSON.stringify(
        {
          message: "No icons found matching your criteria",
          hint: "Try broadening your search or use aksel-icons://categories to see available categories",
          searchCriteria: { category, subcategory, keyword, variant },
        },
        null,
        2,
      );
    }

    const summary = {
      totalMatches: filtered.length,
      returned: results.length,
      searchCriteria: { category, subcategory, keyword, variant },
      icons: results.map((icon) => ({
        name: icon.name,
        category: icon.category,
        subcategory: icon.sub_category,
        variant: icon.variant,
        keywords: icon.keywords.slice(0, 5), // Top 5 keywords
      })),
    };

    if (filtered.length > maxLimit) {
      return JSON.stringify(
        {
          ...summary,
          note: `Showing ${maxLimit} of ${filtered.length} matches. Refine your search criteria to see more specific results.`,
        },
        null,
        2,
      );
    }

    return JSON.stringify(summary, null, 2);
  },
};

export { iconSearchTool };
