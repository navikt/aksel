import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_MARKDOWN_ARTICLES_INDEX_QUERY } from "@/app/_sanity/queries";
import {
  grunnleggendeKategorier,
  komponentKategorier,
  templatesKategorier,
} from "@/sanity/config";
import { buildMarkdown } from "../helpers/build-markdown";

const BASE_URL = "https://aksel.nav.no";

type SectionEntry<T extends readonly { title: string; value: string }[]> = {
  title: string;
  prefix: string;
  order: number;
  kategorier: T;
  staticPages: { title: string; slug: string; category: T[number]["value"] }[];
};

const sectionConfig = {
  komponent_artikkel: {
    title: "Components",
    prefix: "komponenter",
    order: 0,
    kategorier: komponentKategorier,
    staticPages: [
      { title: "Ikoner", slug: "/komponenter/ikoner", category: "core" },
    ],
  } satisfies SectionEntry<typeof komponentKategorier>,
  ds_artikkel: {
    title: "Foundations",
    prefix: "grunnleggende",
    order: 1,
    kategorier: grunnleggendeKategorier,
    staticPages: [
      {
        title: "Design tokens",
        slug: "/grunnleggende/styling/design-tokens",
        category: "styling",
      },
      {
        title: "Tailwind config for `@navikt/ds-tailwind`",
        slug: "/grunnleggende/styling/tailwind-config",
        category: "styling",
      },
    ],
  } satisfies SectionEntry<typeof grunnleggendeKategorier>,
  templates_artikkel: {
    title: "Templates and Patterns",
    prefix: "monster-maler",
    order: 2,
    kategorier: templatesKategorier,
    staticPages: [],
  } satisfies SectionEntry<typeof templatesKategorier>,
};

const title = "Aksel designsystem - Dokumentasjon for LLMs";

async function markdown() {
  const { data: items = [] } = await sanityMarkdownFetch({
    query: ALL_MARKDOWN_ARTICLES_INDEX_QUERY,
  });

  /**
   * Start out by grouping all articles by their Sanity "_type",
   * which corresponds to the main category of the documentation.
   * This allows us to create sections in the markdown output for each category, and list relevant articles within them.
   */
  const byType = new Map<string, typeof items>();
  for (const item of items) {
    if (!item.slug || !item.heading) {
      continue;
    }

    const list = byType.get(item._type) ?? [];
    list.push(item);
    byType.set(item._type, list);
  }

  const sections: string[] = [];

  const sortedTypes = Object.entries(sectionConfig).sort(
    ([, a], [, b]) => a.order - b.order,
  );

  for (const [type, config] of sortedTypes) {
    /* Account for custom indexing of pages in sanity */
    const typeItems = (byType.get(type) ?? []).sort((a, b) => {
      const sidebarSort = (a.sidebarindex ?? 0) - (b.sidebarindex ?? 0);
      if (sidebarSort !== 0) {
        return sidebarSort;
      }

      return (a.heading ?? "").localeCompare(b.heading ?? "");
    });

    if (typeItems.length === 0) {
      continue;
    }

    const categoryParts: string[] = [];

    for (const kategori of config.kategorier) {
      const categoryItems = typeItems.filter(
        (item) => item.kategori === kategori.value,
      );
      const categoryStatics = config.staticPages.filter(
        (page) => page.category === kategori.value,
      );

      if (categoryItems.length === 0 && categoryStatics.length === 0) {
        continue;
      }

      const staticLines = categoryStatics.map(
        (page) => `- [${page.title}](${BASE_URL}${page.slug}.md)`,
      );

      const lines = categoryItems.map(
        (item) => `- [${item.heading}](${BASE_URL}/${item.slug}.md)`,
      );

      categoryParts.push(
        buildMarkdown(
          { heading: kategori.title, level: 3 },
          ...staticLines,
          lines.join("\n"),
        ),
      );
    }

    sections.push(
      buildMarkdown(
        { heading: config.title, level: 2 },
        `Collection (Avoid using collection if possible): [All ${config.title}](${BASE_URL}/${config.prefix}.md)`,
        categoryParts.join("\n\n"),
      ),
    );
  }

  return buildMarkdown(
    { heading: title, level: 1 },
    { heading: "Notes", level: 2 },
    "Each article is available as an individual .md file. Prefer fetching individual articles over the full collection when you only need specific documentation.",
    sections.join("\n\n"),
  );
}

export default { markdown };
