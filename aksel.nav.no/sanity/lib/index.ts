export * from "./fields";
export * from "./preview";
export * from "./seo";
import { Settings } from "@navikt/ds-icons";
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: "2020-06-19" });

export const prinsipper = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];

export function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

export const sanitySlug = (prefix: string, depth: number, source?: string) => ({
  title: "url",
  name: "slug",
  type: "slug",
  validation: (Rule) => validateSlug(Rule, prefix, depth ?? 3),
  group: "settings",
  options: {
    isUnique: isSlugUnique,
    source: source ?? "heading",
    slugify: (input) =>
      `${prefix}${input}`
        .toLowerCase()
        .trim()
        .slice(0, 80)
        .trim()
        .replace(/\s+/g, "-")
        .replace("--", "-")
        .replace("(", "")
        .replace(")", "")
        .replace("æ", "a")
        .replace("ø", "o")
        .replace("å", "a")
        .replace(".", "-"),
  },
});

/* Checks that slug starts with prefix and is nested to x depth */
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
  const { document } = options;

  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  return client.fetch(query, params);
};

export const isEditorUnique = (slug, options) => {
  const { document } = options;

  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  const query = `!defined(*[!(_id in [$draft, $published]) && _type == "editor" && user_id.current == $slug][0]._id)`;
  return client.fetch(query, params);
};

export const groups = [
  {
    name: "innhold",
    title: "Innhold",
    default: true,
  },
  {
    name: "metadata",
    title: "Metadata",
  },
  {
    name: "settings",
    title: "Innstillinger",
    icon: Settings,
  },
  {
    name: "lenker",
    title: "Linking",
  },
  {
    name: "beta",
    title: "Beta",
  },
  {
    name: "seo",
    title: "SEO",
  },
];
