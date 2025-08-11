import "server-only";
import { sanityFetch } from "@/app/_sanity/live";
import { SLUG_BY_TYPE_QUERY } from "@/app/_sanity/queries";
import { AllArticleDocumentsT } from "@/sanity/config";

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

/**
 * Top-level pages are pages that are not nested under a category.
 * They will ex have the slug format: "komponenter/<slug>" or "grunnleggende/<slug>",
 * instead of "komponenter/<category>/<slug>".
 */
async function getStaticParamsSlugs({
  type,
  onlyTopLevelPages = false,
}: {
  type: keyof typeof SanityDoctypeSlugPrefixConfig;
  onlyTopLevelPages: boolean;
}) {
  const { data } = await sanityFetch({
    query: SLUG_BY_TYPE_QUERY,
    params: { type },
    stega: false,
    perspective: "published",
  });

  return data
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((slug) => {
      const [category, page] = slug
        .replace(`${SanityDoctypeSlugPrefixConfig[type]}/`, "")
        .split("/");

      if (onlyTopLevelPages) {
        return {
          category,
        };
      }

      return {
        category,
        page,
      };
    })
    .filter((item) => {
      if (onlyTopLevelPages) {
        return !!item.category;
      }

      return !!item.category && !!item.page;
    });
}

export { getStaticParamsSlugs };
