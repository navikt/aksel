import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_MARKDOWN_ARTICLES_INDEX_QUERY } from "@/app/_sanity/queries";
import { buildMarkdown } from "../helpers/build-markdown";

const BASE_URL = "https://aksel.nav.no";

const sectionConfig: Record<
  string,
  {
    title: string;
    prefix: string;
    order: number;
    staticPages: { title: string; slug: string }[];
  }
> = {
  komponent_artikkel: {
    title: "Components",
    prefix: "komponenter",
    order: 0,
    staticPages: [{ title: "Ikoner", slug: "/komponenter/ikoner" }],
  },
  ds_artikkel: {
    title: "Foundations",
    prefix: "grunnleggende",
    order: 1,
    staticPages: [
      { title: "Design tokens", slug: "/grunnleggende/styling/design-tokens" },
    ],
  },
  templates_artikkel: {
    title: "Templates and Patterns",
    prefix: "monster-maler",
    order: 2,
    staticPages: [],
  },
};

const title = "Aksel designsystem - Dokumentasjon for LLMs";

async function markdown() {
  const { data } = await sanityMarkdownFetch({
    query: ALL_MARKDOWN_ARTICLES_INDEX_QUERY,
  });

  const items = data ?? [];

  const byType = new Map<string, typeof data>();

  for (const item of items) {
    if (!item.slug || !item.heading) continue;
    const list = byType.get(item._type) ?? [];
    list.push(item);
    byType.set(item._type, list);
  }

  const sections: string[] = [];

  const sortedTypes = Object.entries(sectionConfig).sort(
    ([, a], [, b]) => a.order - b.order,
  );

  for (const [type, config] of sortedTypes) {
    const typeItems = (byType.get(type) ?? []).sort((a, b) => {
      const sidebarSort = (a.sidebarindex ?? 0) - (b.sidebarindex ?? 0);
      if (sidebarSort !== 0) return sidebarSort;
      return (a.heading ?? "").localeCompare(b.heading ?? "");
    });

    if (typeItems.length === 0) continue;

    const lines = typeItems.map(
      (item) =>
        `- [${item.heading}](${BASE_URL}/${item.slug}.md)${item.kategori ? ` (${item.kategori})` : ""}`,
    );

    const staticPages = config.staticPages.map(
      (page) => `- [${page.title}](${BASE_URL}${page.slug}.md)`,
    );

    sections.push(
      buildMarkdown(
        { heading: config.title, level: 2 },
        `Collection: [All ${config.title}](${BASE_URL}/${config.prefix}.md)`,
        ...staticPages,
        lines.join("\n"),
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
