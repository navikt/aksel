import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_MARKDOWN_ARTICLES_INDEX_QUERY } from "@/app/_sanity/queries";
import {
  groupLlmDocumentation,
  llmSectionConfig,
} from "@/app/api/llm/helpers/docs-structure";
import { buildMarkdown } from "../helpers/build-markdown";

const BASE_URL = "https://aksel.nav.no";

const title = "Aksel designsystem - Dokumentasjon for LLMs";

async function markdown() {
  const { data: items = [] } = await sanityMarkdownFetch({
    query: ALL_MARKDOWN_ARTICLES_INDEX_QUERY,
  });
  const sections: string[] = [];

  for (const section of groupLlmDocumentation(items)) {
    if (section.itemCount === 0) {
      continue;
    }

    const categoryParts: string[] = [];

    for (const category of section.categories) {
      const { items: categoryItems, kategori, staticPages } = category;

      if (categoryItems.length === 0 && staticPages.length === 0) {
        continue;
      }

      const staticLines = staticPages.map(
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
        { heading: section.config.title, level: 2 },
        `Collection (Avoid using collection if possible): [All ${section.config.title}](${BASE_URL}/${section.config.prefix}.md)`,
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
export { llmSectionConfig };
