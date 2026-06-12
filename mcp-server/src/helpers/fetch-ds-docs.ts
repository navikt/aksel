import { createClient } from "@sanity/client";
import { createNodeCache, oneHourSeconds } from "./node-cache.js";

const { cacheGet, cacheSet } = createNodeCache(
  "search_index_fuse",
  oneHourSeconds * 4,
);

/**
 * Bumped on every successful network refetch. Consumers (e.g. the Fuse index in
 * fuse-search) use this to detect when the cached docs have been refreshed, so
 * derived caches stay in sync with this single source of truth instead of
 * keeping their own independent TTL.
 */
let docsGeneration = 0;

function getDocsGeneration() {
  return docsGeneration;
}

async function fetchDsDocs() {
  try {
    if (cacheGet("ds_docs")) {
      return JSON.parse(cacheGet("ds_docs")!);
    }

    /**
     * TODO: Add env config to workflow
     */
    const client = createClient({
      projectId: "hnbe3yhs",
      dataset: "production",
      apiVersion: "2025-08-10",
      token: process.env.SANITY_READ_NO_DRAFTS,
      useCdn: true,
      perspective: "published",
    });

    const allArticles = await client.fetch(
      `*[_type in ["komponent_artikkel", "ds_artikkel", "templates_artikkel"]]{
      _type,
      heading,
      "slug": slug.current,
      status,
      "intro": pt::text(intro.body),
      content,
      kategori
  }`,
      {},
      { useCdn: true, perspective: "published" },
    );

    if (!allArticles) {
      throw new Error("Failed to fetch DS docs");
    }

    const sanitizedData = sanitizeSanityData(allArticles);

    cacheSet("ds_docs", JSON.stringify(sanitizedData));
    docsGeneration += 1;
    return sanitizedData;
  } catch {
    return null;
  }
}

type SearchPageT = {
  heading: string;
  intro: string;
  slug: string;
  status: { bilde: any; tag: string } | null;
  content: any[];
  lvl2: string[];
  lvl3: string[];
  lvl4: string[];
  seo?: { meta?: string };
  kategori: string;
  _type: string;
};

function sanitizeSanityData(_data: SearchPageT[]): SearchPageT[] {
  return _data.map((x) => ({
    intro: x.intro ?? x.seo?.meta ?? "",
    lvl2: getHeadings(x.content, "h2"),
    lvl3: getHeadings(x.content, "h3"),
    lvl4: getHeadings(x.content, "h4"),
    content: mapContent(x.content),
    heading: x.heading,
    slug: `${x.slug}.md`,
    seo: x.seo,
    status: x.status,
    kategori: x.kategori,
    _type: x._type,
  }));
}

function getHeadings(blocks: any[], block: "h2" | "h3" | "h4") {
  if (!blocks || blocks.length === 0) {
    return [];
  }
  return blocks.filter((x) => x.style === block).map((x) => x.children[0].text);
}

function mapContent(blocks: any[]) {
  if (!blocks || blocks.length === 0) {
    return [];
  }

  const contentBlocks: string[] = [];

  for (const x of blocks) {
    if (x.style === "normal") {
      contentBlocks.push(x.children[0].text.replace(/\n|\r/g, " "));
    }
  }

  return contentBlocks;
}

export { fetchDsDocs, getDocsGeneration };
