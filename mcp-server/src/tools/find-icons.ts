import { z } from "zod";
import { searchIcons } from "../helpers/search-icons.js";
import { metadata } from "../resources/icons-catalog.js";
import type { McpTool } from "../types.js";

const icons = Object.values(metadata);
const categories = Array.from(
  new Set(icons.map((icon) => icon.category)),
).sort();
const variants = Array.from(
  new Set([...icons.map((icon) => icon.variant), "both"]),
).sort();

const findIconsInputSchema = {
  category: z.enum(categories as [string, ...string[]]).optional(),
  keyword: z.string().optional(),
  variant: z
    .enum(variants as [string, ...string[]])
    .optional()
    .default("both"),
  limit: z.number().int().min(1).max(100).optional().default(20),
};

const findIconsTool: McpTool<typeof findIconsInputSchema> = {
  name: "aksel_find_icons",
  description:
    "Find and filter Aksel icons by category, keyword, and variant. Keyword matching is fuzzy (handles typos and synonyms) across icon names and keywords. Use aksel-icons://category-catalog to discover available categories first.",
  inputSchema: findIconsInputSchema,
  async callback({ category, keyword, variant, limit }) {
    let filtered = icons;

    if (category) {
      filtered = filtered.filter(
        (icon) => icon.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (keyword) {
      const ranking = new Map(
        searchIcons(keyword).map((icon, index) => [icon.id, index]),
      );

      filtered = filtered
        .filter((icon) => ranking.has(icon.id))
        .sort((a, b) => (ranking.get(a.id) ?? 0) - (ranking.get(b.id) ?? 0));
    }

    if (variant && variant !== "both") {
      filtered = filtered.filter((icon) => icon.variant === variant);
    }

    const results = filtered.slice(0, limit);

    if (results.length === 0) {
      return JSON.stringify({
        message: "No icons found matching your criteria",
        hint: "Try broadening your search or use aksel-icons://category-catalog to see available categories",
      });
    }

    const summary = {
      totalMatches: filtered.length,
      returned: results.length,
      icons: results.map((icon) => ({
        name: icon.name,
        category: icon.category,
        variant: icon.variant,
      })),
    };

    if (filtered.length > limit) {
      return JSON.stringify({
        ...summary,
        note: `Showing ${limit} of ${filtered.length} matches. Refine your search criteria to see more specific results.`,
      });
    }

    return JSON.stringify(summary);
  },
};

export { findIconsTool };
