import type { FuseResult, FuseResultMatch } from "fuse.js";
import Fuse from "fuse.js";
import omit from "lodash/omit";
import "server-only";
import {
  SearchHitT,
  SearchPageT,
  globalSearchConfig,
} from "@/app/_ui/global-search/GlobalSearch.types";
import { fetchSearchArticles } from "./search-articles";

async function fuseGlobalSearch(query: string) {
  const localData = await fetchSearchArticles();
  if (!query || query.length < 2) {
    return null;
  }

  const fuse = new Fuse(localData, {
    keys: [
      { name: "heading", weight: 100 },
      { name: "lvl2.text", weight: 50 },
      { name: "lvl3.text", weight: 30 },
      { name: "lvl4.text", weight: 20 },
      { name: "ingress", weight: 20 },
      { name: "intro", weight: 20 },
      { name: "tema", weight: 60 },
      { name: "content.text", weight: 10 },
      { name: "overrideString", weight: 999 },
    ],
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 3,
    ignoreLocation: true,
    includeMatches: true,
    threshold: 0.18,
    distance: 50,
  });

  const fuseResults = fuse
    .search(query)
    .filter((x) => x.score !== undefined && x.score < 0.3);

  const formatedResults = formatFuseResults(fuseResults).sort((a, b) => {
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

  const groupedHits: Partial<
    Record<keyof typeof globalSearchConfig, SearchHitT[]>
  > = formatedResults?.reduce((prev, cur) => {
    const type = cur.item._type;
    if (!prev[type]) {
      prev[type] = [];
    }

    // Limit the number of hits per type to 20
    if (prev[type].length >= 20) {
      return prev;
    }

    prev[type].push(cur);
    return prev;
  }, {});

  const topResults =
    formatedResults?.length > 4
      ? formatedResults
          .filter((x) => x.score !== undefined && x.score < 0.1)
          .slice(0, 4)
      : [];

  return {
    result: {
      totalHits: Object.values(groupedHits).reduce(
        (acc, val) => acc + val.length,
        0,
      ),
      topResults,
      groupedHits: Object.entries(groupedHits).sort(
        (a, b) =>
          globalSearchConfig[a[0]].index - globalSearchConfig[b[0]].index,
      ),
    },
    query,
  };
}

function formatFuseResults(
  rawResults: FuseResult<SearchPageT>[],
): SearchHitT[] {
  return rawResults.map((result) => {
    const item = result.item;

    return {
      ...result,
      item: omit(item, ["intro", "ingress"]),
      anchor: result.matches?.[0]
        ? resolveAnchor(result.matches[0], item)
        : undefined,
      description: item?.intro || item?.ingress || "",
    };
  });
}

function resolveAnchor(match: FuseResultMatch, item: SearchPageT) {
  if (match.key?.includes("lvl")) {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  if (match.key === "content.text") {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const { query } = (await request.json()) as { query: string };

    const result = await fuseGlobalSearch(query);

    return Response.json(result);
  } catch (error) {
    console.error("Global search failed:", error);
    return new Response(null, { status: 500 });
  }
}
