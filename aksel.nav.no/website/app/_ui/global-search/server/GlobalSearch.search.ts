import type { FuseResult, FuseResultMatch } from "fuse.js";
import "server-only";
import { urlForImage } from "@/app/_sanity/utils";
import {
  GLOBAL_SEARCH_MIN_QUERY_LENGTH,
  type GlobalSearchResultT,
  type SearchHitGroupT,
  type SearchHitT,
  type SearchPageT,
  type SearchResultPageTypesT,
  globalSearchConfig,
} from "./GlobalSearch.config";
import { getSearchIndex } from "./GlobalSearch.index";

async function globalSearch(
  query: string,
): Promise<GlobalSearchResultT | null> {
  if (query.length < GLOBAL_SEARCH_MIN_QUERY_LENGTH) {
    return null;
  }

  const fuse = await getSearchIndex();
  const fuseResults = fuse
    .search(query)
    .filter((x) => x.score !== undefined && x.score < 0.3)
    .sort((a, b) => {
      const aOverride = a.score === 0 && !!a.item.overrideString;
      const bOverride = b.score === 0 && !!b.item.overrideString;

      if (aOverride && bOverride) {
        return 0;
      }
      if (aOverride && !bOverride) {
        return -1;
      }

      return 1;
    });

  const groups = new Map<SearchResultPageTypesT, SearchHitGroupT>();
  for (const result of fuseResults) {
    const type = result.item._type;
    const group = groups.get(type) ?? { type, total: 0, hits: [] };
    groups.set(type, group);

    group.total++;
    if (group.hits.length < 10) {
      group.hits.push(toSearchHit(result));
    }
  }

  const groupedHits = [...groups.values()].sort(
    (a, b) =>
      globalSearchConfig[a.type].index - globalSearchConfig[b.type].index,
  );

  const topResults =
    fuseResults.length > 4
      ? fuseResults
          .filter((x) => x.score !== undefined && x.score < 0.1)
          .slice(0, 4)
          .map(toSearchHit)
      : [];

  return {
    result: {
      totalHits: groupedHits.reduce((acc, group) => acc + group.hits.length, 0),
      topResults,
      groupedHits,
    },
    query,
  };
}

function toSearchHit(result: FuseResult<SearchPageT>): SearchHitT {
  const { item } = result;
  const section = result.matches?.[0]
    ? resolveSection(result.matches[0], item)
    : undefined;

  return {
    heading: item.heading,
    slug: item.slug,
    type: item._type,
    description: item.intro || item.ingress || "",
    anchor: section?.id || undefined,
    sectionHeading: section?.text || undefined,
    statusTag: item.status?.tag || undefined,
    thumbnail: urlForImage(item.status?.bilde)?.url(),
  };
}

function resolveSection(
  match: FuseResultMatch,
  item: SearchPageT,
): { id: string; text?: string } | undefined {
  if (match.refIndex === undefined) {
    return undefined;
  }

  switch (match.key) {
    case "lvl2.text":
      return item.lvl2[match.refIndex];
    case "lvl3.text":
      return item.lvl3[match.refIndex];
    case "lvl4.text":
      return item.lvl4[match.refIndex];
    case "content.text": {
      const block = item.content[match.refIndex];
      const id = typeof block === "string" ? undefined : block?.id;
      if (!id) {
        return undefined;
      }
      const heading = [...item.lvl2, ...item.lvl3, ...item.lvl4].find(
        (x) => x.id === id,
      );
      return { id, text: heading?.text };
    }
    default:
      return undefined;
  }
}

export { globalSearch };
