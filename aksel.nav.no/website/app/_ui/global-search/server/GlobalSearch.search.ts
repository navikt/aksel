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

const MAX_HITS_PER_TYPE = 10;
const MAX_TOP_RESULTS = 4;

/* Tie-breaker when two matches are equally strong. */
const MATCH_KEY_PRIORITY = [
  "overrideString",
  "heading",
  "lvl2.text",
  "lvl3.text",
  "lvl4.text",
  "intro",
  "ingress",
  "tema",
  "content.text",
];

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
    .sort((a, b) => Number(isOverrideHit(b)) - Number(isOverrideHit(a)));

  const topResults =
    fuseResults.length > MAX_TOP_RESULTS
      ? fuseResults
          .filter((x) => x.score !== undefined && x.score < 0.1)
          .slice(0, MAX_TOP_RESULTS)
      : [];
  const topResultSet = new Set(topResults);

  const groups = new Map<SearchResultPageTypesT, SearchHitGroupT>();
  for (const result of fuseResults) {
    if (topResultSet.has(result)) {
      continue;
    }

    const type = result.item._type;
    const group = groups.get(type) ?? { type, total: 0, hits: [] };
    groups.set(type, group);

    group.total++;
    if (group.hits.length < MAX_HITS_PER_TYPE) {
      group.hits.push(toSearchHit(result));
    }
  }

  const groupedHits = [...groups.values()].sort(
    (a, b) =>
      globalSearchConfig[a.type].index - globalSearchConfig[b.type].index,
  );

  return {
    result: {
      totalHits: fuseResults.length,
      topResults: topResults.map(toSearchHit),
      groupedHits,
    },
    query,
  };
}

function isOverrideHit(result: FuseResult<SearchPageT>) {
  return result.score === 0 && !!result.item.overrideString;
}

function toSearchHit(result: FuseResult<SearchPageT>): SearchHitT {
  const { item } = result;
  const bestMatch = findBestMatch(result.matches);
  const section = bestMatch ? resolveSection(bestMatch, item) : undefined;

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

/* Strongest match = longest contiguous matched run. Page-level winners resolve to no anchor. */
function findBestMatch(
  matches: readonly FuseResultMatch[] | undefined,
): FuseResultMatch | undefined {
  let best: FuseResultMatch | undefined;
  let bestRun = 0;

  for (const match of matches ?? []) {
    const run = longestRun(match);
    if (
      run > bestRun ||
      (run === bestRun && best && keyPriority(match) < keyPriority(best))
    ) {
      best = match;
      bestRun = run;
    }
  }

  return best;
}

function longestRun(match: FuseResultMatch) {
  let run = 0;
  for (const [start, end] of match.indices) {
    run = Math.max(run, end - start + 1);
  }
  return run;
}

function keyPriority(match: FuseResultMatch) {
  const index = MATCH_KEY_PRIORITY.indexOf(match.key ?? "");
  return index === -1 ? MATCH_KEY_PRIORITY.length : index;
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
