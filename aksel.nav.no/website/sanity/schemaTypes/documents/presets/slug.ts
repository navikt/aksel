import { SANITY_API_VERSION } from "@/sanity/config";
import { sanitizeSlug } from "../../util";

export const validateSlug = (Rule, prefix, nesting) =>
  Rule.required().custom((slug) => {
    if (!slug.current.startsWith(prefix)) {
      return `Slug må starte med prefiks: ${prefix}`;
    }
    if ((slug.current.match(/\//g) || []).length > nesting - 1) {
      return `Siden kan bare være på ${nesting} nivå`;
    }
    return true;
  });

/* Checks every document for matching slug */
export const isSlugUnique = (slug, options) => {
  const { document, getClient } = options;

  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  return getClient({ apiVersion: SANITY_API_VERSION }).fetch(query, params);
};

export const sanitySlug = (prefix: string, depth: number, source?: string) => ({
  title: "url",
  name: "slug",
  type: "slug",
  validation: (Rule) => validateSlug(Rule, prefix, depth ?? 3),
  group: "settings",
  options: {
    isUnique: isSlugUnique,
    source: source ?? "heading",
    slugify: (s) => prefix + sanitizeSlug(s),
  },
});

export const validateKategoriSlug = (Rule, prefix) =>
  Rule.required().custom((slug, { document }) => {
    if (!slug.current.startsWith(`${prefix}${document?.kategori}/`)) {
      return `Slug må starte med prefiks: ${prefix}${document?.kategori}`;
    }
    if ((slug.current.match(/\//g) || []).length > 3 - 1) {
      return `Siden kan bare være på ${3} nivå`;
    }
    return true;
  });

export const kategoriSlug = (prefix: string) => ({
  title: "url",
  name: "slug",
  type: "slug",
  validation: (Rule) => validateKategoriSlug(Rule, prefix),
  group: "settings",
  options: {
    source: "heading",
    slugify: (input, _, { parent }) => {
      return `${prefix}${parent?.kategori}/${input}`
        .toLowerCase()
        .trim()
        .slice(0, 200)
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/gm, "-")
        .replace(/æ/g, "a")
        .replace(/å/g, "a")
        .replace(/ø/g, "o")
        .replace(/[&\\#!,+()$~%.'"¨:*?<>{}]/g, "");
    },
  },
});
