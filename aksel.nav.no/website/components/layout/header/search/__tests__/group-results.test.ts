import { SearchResultsT } from "@/types";
import { createSearchResult } from "../group-results";

describe("createSearchResult", () => {
  let result;
  let rawResults;

  beforeEach(() => {
    result = [
      {
        item: { _type: "komponent_artikkel" },
        score: 0.05,
        matches: [],
      },
      {
        item: { _type: "aksel_artikkel" },
        score: 0.1,
        matches: [],
      },
      {
        item: { _type: "ds_artikkel" },
        score: 0.15,
        matches: [],
      },
      {
        item: { _type: "aksel_blogg" },
        score: 0.2,
        matches: [],
      },
      {
        item: { _type: "aksel_prinsipp" },
        score: 0.25,
        matches: [],
      },
      {
        item: { _type: "aksel_standalone" },
        score: 0.3,
        matches: [],
      },
    ];
    rawResults = [
      { item: { _type: "komponent_artikkel" }, score: 0.05 },
      { item: { _type: "aksel_artikkel" }, score: 0.1 },
      { item: { _type: "ds_artikkel" }, score: 0.15 },
      { item: { _type: "aksel_blogg" }, score: 0.2 },
      { item: { _type: "aksel_prinsipp" }, score: 0.25 },
      { item: { _type: "aksel_standalone" }, score: 0.3 },
    ];
  });

  it("should group hits by type", () => {
    const expected = {
      komponent_artikkel: [
        { item: { _type: "komponent_artikkel" }, score: 0.05, matches: [] },
      ],
      aksel_artikkel: [
        { item: { _type: "aksel_artikkel" }, score: 0.1, matches: [] },
      ],
      ds_artikkel: [
        { item: { _type: "ds_artikkel" }, score: 0.15, matches: [] },
      ],
      aksel_blogg: [
        { item: { _type: "aksel_blogg" }, score: 0.2, matches: [] },
      ],
      aksel_prinsipp: [
        { item: { _type: "aksel_prinsipp" }, score: 0.25, matches: [] },
      ],
      aksel_standalone: [
        { item: { _type: "aksel_standalone" }, score: 0.3, matches: [] },
      ],
    };
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.groupedHits).toEqual(expected);
  });

  it("should return top 3 results with score < 0.1", () => {
    const expected = [
      { item: { _type: "komponent_artikkel" }, score: 0.05, matches: [] },
    ];
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.topResults).toEqual(expected);
  });

  it("should return total number of hits", () => {
    const expected = 6;
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.totalHits).toEqual(expected);
  });

  it("should return number of hits by type", () => {
    const expected = {
      komponent_artikkel: 1,
      aksel_artikkel: 1,
      ds_artikkel: 1,
      aksel_blogg: 1,
      aksel_prinsipp: 1,
      aksel_standalone: 1,
    };
    const actual: SearchResultsT = createSearchResult(result, rawResults);
    expect(actual.hits).toEqual(expected);
  });
});
