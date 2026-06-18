import { z } from "zod";
import { metadata } from "../resources/icons-catalog.js";
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

const findIconsInputSchema = {
  category: z.enum(categories as [string, ...string[]]).optional(),
  subcategory: z.enum(subcategories as [string, ...string[]]).optional(),
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
    "Find and filter Aksel icons by category, subcategory, keyword, and variant. Use aksel-icons://category-catalog to discover available categories first.",
  inputSchema: findIconsInputSchema,
  async callback({ category, subcategory, keyword, variant, limit }) {
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
        subcategory: icon.sub_category,
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
