import { z } from "zod";
import { metadata } from "../resources/icon-categories.js";
import type { McpTool } from "../types.js";

const icons = Object.values(metadata);
const categories = Array.from(
  new Set(icons.map((icon) => icon.category)),
).sort();
const subcategories = Array.from(
  new Set(icons.map((icon) => icon.sub_category)),
).sort();
const variants = Array.from(
  new Set([...icons.map((icon) => icon.variant), "both"]),
).sort();

const iconSearchInputSchema = {
  category: z.enum(categories as [string, ...string[]]).optional(),
  subcategory: z.enum(subcategories as [string, ...string[]]).optional(),
  keyword: z.string().optional(),
  variant: z
    .enum(variants as [string, ...string[]])
    .optional()
    .default("both"),
  limit: z.number().int().min(1).max(100).optional().default(20),
};

const iconSearchTool: McpTool<typeof iconSearchInputSchema> = {
  name: "aksel_icons_search",
  description:
    "Search and filter Aksel icons. Returns icon names with metadata. Use this after checking aksel-icons://categories to scope your search.",
  inputSchema: iconSearchInputSchema,
  async callback({ category, subcategory, keyword, variant, limit }) {
    const maxLimit = limit || 20;
    let filtered = icons;

    if (category) {
      filtered = filtered.filter(
        (icon) => icon.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (subcategory) {
      filtered = filtered.filter(
        (icon) => icon.sub_category.toLowerCase() === subcategory.toLowerCase(),
      );
    }

    if (keyword) {
      const searchTerm = keyword.toLowerCase();
      filtered = filtered.filter(
        (icon) =>
          icon.name.toLowerCase().includes(searchTerm) ||
          icon.keywords.some((kw) => kw.toLowerCase().includes(searchTerm)),
      );
    }

    if (variant && variant !== "both") {
      filtered = filtered.filter((icon) => icon.variant === variant);
    }

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
        keywords: icon.keywords,
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

    return JSON.stringify(
      {
        ...summary,
      },
      null,
      2,
    );
  },
};

export { iconSearchTool };
