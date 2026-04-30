import { NextResponse } from "next/server";
import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_MARKDOWN_ARTICLES_INDEX_QUERY } from "@/app/_sanity/queries";
import { llmSectionConfig } from "@/app/api/markdown/routes/llm";

type DocEntry = {
  name: string;
  path: string;
  section: string;
  subcategory: string;
};

export const revalidate = 7200;

const addMarkdownExtension = (slug: string) =>
  slug.endsWith(".md") ? slug : `${slug}.md`;

/**
 * Creates a structured response with all documentation available
 * @example
 * ```json
 * {
 *  "generatedAt": "2026-04-30T12:11:10.797Z",
 *  "total": 94,
 *  "entries": [
 *    {
 *      "name": "Page",
 *      "path": "/komponenter/primitives/page.md",
 *      "section": "Components",
 *      "subcategory": "Primitives"
 *    },
 *    {
 *      "name": "HGrid",
 *      "path": "/komponenter/primitives/hgrid.md",
 *      "section": "Components",
 *      "subcategory": "Primitives"
 *    }
 *  ]}
 * ```
 */
export async function GET() {
  try {
    const { data: items = [] } = await sanityMarkdownFetch({
      query: ALL_MARKDOWN_ARTICLES_INDEX_QUERY,
    });

    const byType = new Map<string, typeof items>();
    for (const item of items) {
      if (!item.slug || !item.heading) {
        continue;
      }
      const list = byType.get(item._type) ?? [];
      list.push(item);
      byType.set(item._type, list);
    }

    const entries: DocEntry[] = [];
    const seenPaths = new Set<string>();

    const sortedConfig = Object.entries(llmSectionConfig).sort(
      ([, a], [, b]) => a.order - b.order,
    );

    for (const [type, config] of sortedConfig) {
      const typeItems = (byType.get(type) ?? []).sort((a, b) => {
        const sidebarSort = (a.sidebarindex ?? 0) - (b.sidebarindex ?? 0);
        if (sidebarSort !== 0) return sidebarSort;
        return (a.heading ?? "").localeCompare(b.heading ?? "");
      });

      const itemsByKategori = new Map<string, typeof typeItems>();
      for (const item of typeItems) {
        if (!item.kategori) {
          continue;
        }

        const list = itemsByKategori.get(item.kategori) ?? [];
        list.push(item);
        itemsByKategori.set(item.kategori, list);
      }

      for (const kategori of config.kategorier) {
        const categoryItems = itemsByKategori.get(kategori.value) ?? [];
        const categoryStatics = config.staticPages.filter(
          (page) => page.category === kategori.value,
        );

        for (const page of categoryStatics) {
          const path = addMarkdownExtension(page.slug);
          if (seenPaths.has(path)) {
            continue;
          }

          seenPaths.add(path);
          entries.push({
            name: page.title,
            path,
            section: config.title,
            subcategory: kategori.title,
          });
        }

        for (const item of categoryItems) {
          const path = addMarkdownExtension(`/${item.slug}`);
          if (seenPaths.has(path)) {
            continue;
          }

          seenPaths.add(path);
          entries.push({
            name: item.heading ?? "",
            path,
            section: config.title,
            subcategory: kategori.title,
          });
        }
      }
    }

    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        total: entries.length,
        entries,
      },
      {
        headers: {
          "Cache-Control": `public, max-age=${revalidate}`,
        },
      },
    );
  } catch (error) {
    console.error("Failed to build LLM docs index", error);
    return NextResponse.json(
      { error: "Failed to fetch documentation index" },
      { status: 500 },
    );
  }
}
