import Fuse from "fuse.js";
import { FuseItemT, GroupedHitsT, SearchHitT, SearchResultsT } from "@/types";

export function createSearchResult(
  result: SearchHitT[],
  rawResults: Fuse.FuseResult<FuseItemT>[],
) {
  const groupedHits: GroupedHitsT = result?.reduce((prev, cur) => {
    if (cur.item._type in prev) {
      return { ...prev, [cur.item._type]: [...prev[cur.item._type], cur] };
    } else {
      return { ...prev, [cur.item._type]: [cur] };
    }
  }, {});

  const response: SearchResultsT = {
    groupedHits,
    topResults:
      result?.length > 4 ? result.slice(0, 4).filter((x) => x.score < 0.1) : [],
    totalHits: result?.length ?? 0,
    hits: {
      komponent_artikkel: rawResults.filter(
        (x: any) => x.item._type === "komponent_artikkel",
      ).length,
      aksel_artikkel: rawResults.filter(
        (x: any) => x.item._type === "aksel_artikkel",
      ).length,
      ds_artikkel: rawResults.filter((x: any) => x.item._type === "ds_artikkel")
        .length,
      aksel_blogg: rawResults.filter((x: any) => x.item._type === "aksel_blogg")
        .length,
      templates_artikkel: rawResults.filter(
        (x: any) => x.item._type === "templates_artikkel",
      ).length,
      aksel_prinsipp: rawResults.filter(
        (x: any) => x.item._type === "aksel_prinsipp",
      ).length,
      aksel_standalone: rawResults.filter(
        (x: any) => x.item._type === "aksel_prinsipp",
      ).length,
    },
  };

  return response;
}
