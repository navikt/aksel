import groupBy from "lodash/groupBy";
import omit from "lodash/omit";
import NodeCache from "node-cache";
import "server-only";
import { client } from "@/app/_sanity/client";
import { GLOBAL_SEARCH_QUERY_ALL } from "@/app/_sanity/queries";
import { SearchPageT } from "./GlobalSearch.config";

/**
 * We use node-cache here since nextjs built in
 */
const searchCache = new NodeCache();
const CACHE_KEY = "globalSearchArticles";

/**
 * When stable, use `use cache` with cache-life
 * https://nextjs.org/docs/app/api-reference/directives/use-cache#revalidating
 */
async function fetchArticles(): Promise<SearchPageT[]> {
  const cachedData = searchCache.get<SearchPageT[]>(CACHE_KEY);

  if (cachedData) {
    return cachedData;
  }

  const allArticles = await client.fetch<SearchPageT[]>(
    GLOBAL_SEARCH_QUERY_ALL,
    {},
    { useCdn: false },
  );

  if (!allArticles) {
    console.error("Failed to fetch search index");
    return [];
  }

  const sanitizedData = sanitzeSanityData(allArticles);

  // Cache the data for 1 hour
  searchCache.set(CACHE_KEY, sanitizedData, 60 * 60);

  return sanitizedData;
}

function sanitizeSanityData(_data) {
  return _data
    .sort((a, b) => {
      if (!a.publishedAt && !b.publishedAt) {
        return 0;
      }
      if (!a.publishedAt) {
        return 1;
      }
      if (!b.publishedAt) {
        return -1;
      }

      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .map((x) => ({
      ...omit(x, ["publishedAt", "seo"]),
      intro: x.intro ?? x.seo?.meta ?? "",
      lvl2: getHeadings(x.content, "h2"),
      lvl3: getHeadings(x.content, "h3"),
      lvl4: getHeadings(x.content, "h4"),
      content: mapContent(x.content),
    }));
}

function getHeadings(blocks: any[], block: "h2" | "h3" | "h4") {
  if (!blocks || blocks.length === 0) {
    return "";
  }
  return blocks
    .filter((x) => x.style === block)
    .map((x) => ({ text: x.children[0].text, id: x._key ?? "" }));
}

function mapContent(blocks: any[]) {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  const contentBlocks: { text: string; id?: string }[] = [];

  let currentAnchor = "";
  blocks.forEach((x) => {
    if (["h2", "h3", "h4"].includes(x.style)) {
      currentAnchor = x._key ?? "";
    }
    if (x.style === "normal") {
      contentBlocks.push({
        text: x.children[0].text.replace(/\n|\r/g, " "),
        id: currentAnchor,
      });
    }
  });

  const mapped = Object.entries(groupBy(contentBlocks, "id")).map(
    ([key, value]) => ({ id: key, text: value.map((x) => x.text).join(" ") }),
  );

  return mapped;
}

export { fetchArticles };
