import { NextResponse } from "next/server";
import { sanityMarkdownFetch } from "@/app/_sanity/live";
import { ALL_MARKDOWN_ARTICLES_INDEX_QUERY } from "@/app/_sanity/queries";
import { groupLlmDocumentation } from "@/app/api/llm/helpers/docs-structure";

type DocEntry = {
  name: string;
  path: string;
  category: string;
  subcategory: string;
};

// TODO: Cache Components adoption. Was `export const revalidate = 7200`. Move caching into a `'use cache'` + `cacheLife` boundary around the fetch when adopting this route.

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
 *      "category": "Components",
 *      "subcategory": "Primitives"
 *    },
 *    {
 *      "name": "HGrid",
 *      "path": "/komponenter/primitives/hgrid.md",
 *      "category": "Components",
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

    const entries: DocEntry[] = [];

    for (const section of groupLlmDocumentation(items)) {
      for (const category of section.categories) {
        for (const page of category.staticPages) {
          const path = addMarkdownExtension(page.slug);

          entries.push({
            name: page.title,
            path,
            category: section.config.title,
            subcategory: category.kategori.title,
          });
        }

        for (const item of category.items) {
          const path = addMarkdownExtension(`/${item.slug}`);

          entries.push({
            name: item.heading ?? "",
            path,
            category: section.config.title,
            subcategory: category.kategori.title,
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
          "Cache-Control": `public, max-age=7200`,
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
