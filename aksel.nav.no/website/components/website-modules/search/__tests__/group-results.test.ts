import { FuseResult } from "fuse.js";
import { beforeEach, describe, expect, test } from "vitest";
import type { FuseItemT, SearchHitT, SearchResultsT } from "@/types";
import { createSearchResult } from "../utils";

describe("createSearchResult", () => {
  let result: SearchHitT[];
  let rawResults: FuseResult<FuseItemT>[];

  const placeholders = { heading: "", slug: "", content: [] };

  beforeEach(() => {
    const items = {
      komponent_artikkel: { score: 0.05 },
      aksel_artikkel: { score: 0.1 },
      ds_artikkel: { score: 0.15 },
      aksel_blogg: { score: 0.2 },
      aksel_prinsipp: { score: 0.25 },
      aksel_standalone: { score: 0.3 },
    };

    result = Object.entries(items).map(([key, value]) => ({
      item: {
        _type: key as keyof typeof items,
        ...placeholders,
      },
      score: value.score,
      matches: [],
    }));

    rawResults = Object.entries(items).map(([key, value]) => ({
      item: { _type: key as keyof typeof items, ...placeholders },
      score: value.score,
      refIndex: 0,
      matches: [],
    }));
  });

  test("should group hits by type", () => {
    const expected = {
      komponent_artikkel: [
        {
          item: { _type: "komponent_artikkel", ...placeholders },
          score: 0.05,
          matches: [],
        },
      ],
      aksel_artikkel: [
        {
          item: { _type: "aksel_artikkel", ...placeholders },
          score: 0.1,
          matches: [],
        },
      ],
      ds_artikkel: [
        {
          item: { _type: "ds_artikkel", ...placeholders },
          score: 0.15,
          matches: [],
        },
      ],
      aksel_blogg: [
        {
          item: { _type: "aksel_blogg", ...placeholders },
          score: 0.2,
          matches: [],
        },
      ],
      aksel_prinsipp: [
        {
          item: { _type: "aksel_prinsipp", ...placeholders },
          score: 0.25,
          matches: [],
        },
      ],
      aksel_standalone: [
        {
          item: { _type: "aksel_standalone", ...placeholders },
          score: 0.3,
          matches: [],
        },
      ],
    };
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.groupedHits).toEqual(expected);
  });

  test("should return top 3 results with score < 0.1", () => {
    const expected = [
      {
        item: { _type: "komponent_artikkel", ...placeholders },
        score: 0.05,
        matches: [],
      },
    ];
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.topResults).toEqual(expected);
  });

  test("should return total number of hits", () => {
    const expected = 6;
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.totalHits).toEqual(expected);
  });

  test("should return number of hits by type", () => {
    const expected = {
      komponent_artikkel: 1,
      aksel_artikkel: 1,
      ds_artikkel: 1,
      aksel_blogg: 1,
      aksel_prinsipp: 1,
      aksel_standalone: 1,
      templates_artikkel: 0,
    };
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.hits).toEqual(expected);
  });
});
