// TODO: isSlugUnique + validation
export const sanitySlug = (prefix: string, depth: number, source?: string) => ({
  title: "url",
  name: "slug",
  type: "slug",
  /* validation: (Rule) => validateSlug(Rule, prefix, depth ?? 3), */
  group: "settings",
  options: {
    /* isUnique: isSlugUnique, */
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
