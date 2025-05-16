import { SlugIsUniqueValidator, SlugRule, defineField } from "sanity";
import {
  SANITY_API_VERSION,
  grunnleggendeKategorier,
  komponentKategorier,
  templatesKategorier,
} from "@/sanity/config";
import { sanitizeSlug } from "../../../util";

export const validateSlug = (Rule: SlugRule, prefix: string, nesting: number) =>
  Rule.required().custom((slug) => {
    if (!slug?.current?.startsWith(prefix)) {
      return `Slug må starte med prefiks: ${prefix}`;
    }
    if ((slug?.current?.match(/\//g) || []).length > nesting - 1) {
      return `Siden kan bare være på ${nesting} nivå`;
    }
    return true;
  });

/* Checks every document for matching slug */
export const isSlugUnique: SlugIsUniqueValidator = (slug, options) => {
  const { document, getClient } = options;

  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  return getClient({ apiVersion: SANITY_API_VERSION }).fetch(query, params);
};

export const sanitySlug = (prefix: string, depth: number, source?: string) =>
  defineField({
    title: "URL",
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

const isStandalone = (document) => {
  return document?.kategori === "standalone";
};

export const validateKategoriSlug = (Rule: SlugRule, prefix: string) =>
  Rule.required().custom((slug, { document }) => {
    if (!slug?.current) {
      return `URL må være definert`;
    }
    const slugLength = (slug.current.match(/\//g) || []).length;

    if (isStandalone(document)) {
      if (!slug?.current?.startsWith(`${prefix}`)) {
        return `Slug må være: '${prefix}navn' for frittstående artikler`;
      }
      if (slugLength !== 1) {
        return `Slug må være på 1 nivå for frittstående artikler`;
      }

      for (const section of [
        ...komponentKategorier,
        ...grunnleggendeKategorier,
        ...templatesKategorier,
      ]) {
        if (slug?.current === `${prefix}${section.value}`) {
          return `Slug kan ikke være lik kategori: ${section.value}`;
        }
      }

      return true;
    }

    if (!slug?.current?.startsWith(`${prefix}${document?.kategori}/`)) {
      return `Slug må starte med prefiks: ${prefix}${document?.kategori}`;
    }

    if (slugLength !== 2) {
      return `Siden kan bare være på 3 nivå`;
    }

    return true;
  });

export const kategoriSlug = (prefix: string) =>
  defineField({
    title: "URL",
    name: "slug",
    type: "slug",
    validation: (Rule) => validateKategoriSlug(Rule, prefix),
    group: "settings",
    options: {
      source: "heading",
      slugify: (input, _, context) => {
        let kategori = `${(context.parent as { kategori: string }).kategori}/`;

        /* When an article is set to Standalone, we dont want the "category" in URL */
        if (isStandalone(context.parent)) {
          kategori = "";
        }

        return `${prefix}${kategori}${input}`
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
