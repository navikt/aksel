import { notFound } from "next/navigation";

/**
 * Validates the slug for the design system pages.
 * If the slug is empty or has more than 2 segments, it returns a "not found".
 */
function validateDesignsystemSlug(
  slug: string[],
  type: "komponenter" | "grunnleggende" | "monster-maler",
) {
  if (slug.length === 0 || slug.length > 2) {
    notFound();
  }

  return `${type}/${slug.join("/")}`;
}

export { validateDesignsystemSlug };
