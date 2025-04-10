import "server-only";
import { sanityFetch } from "@/app/_sanity/live";
import { SLUG_BY_TYPE_QUERY } from "@/app/_sanity/queries";
import { AllArticleDocumentsT } from "@/sanity/config";

/**
 * Validates the slug for the design system pages.
 * If the slug is empty or has more than 2 segments, it returns a "not found".
 */
function parseDesignsystemSlug(
  slug: string[],
  type: "komponenter" | "grunnleggende" | "monster-maler" | "produktbloggen",
) {
  if (slug.length === 0 || slug.length > 2) {
    return null;
  }

  return `${type}/${slug.join("/")}`;
}

const SanityDoctypeSlugPrefixConfig = {
  komponent_artikkel: "komponenter",
  ds_artikkel: "grunnleggende",
  templates_artikkel: "monster-maler",
} satisfies Record<
  Extract<
    AllArticleDocumentsT,
    "komponent_artikkel" | "ds_artikkel" | "templates_artikkel"
  >,
  string
>;

async function getStaticParamsSlugs(
  type: keyof typeof SanityDoctypeSlugPrefixConfig,
) {
  const { data } = await sanityFetch({
    query: SLUG_BY_TYPE_QUERY,
    params: { type },
    stega: false,
    perspective: "published",
  });

  return data
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((slug) => {
      return {
        slug: slug
          .replace(`${SanityDoctypeSlugPrefixConfig[type]}/`, "")
          .split("/"),
      };
    });
}

export { getStaticParamsSlugs, parseDesignsystemSlug };
