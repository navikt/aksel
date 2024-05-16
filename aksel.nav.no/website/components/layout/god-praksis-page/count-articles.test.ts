import { describe, expect, test } from "vitest";
import type { ParsedGPArticle } from "@/layout/god-praksis-page/interface";
import { getArticleCounts } from "./count-articles";

describe("getArticleCounts", () => {
  test("should count articles correctly without filters", () => {
    const articles = [
      { undertema: "A", innholdstype: "1" },
      { undertema: "A", innholdstype: "2" },
      { undertema: "B", innholdstype: "1" },
      { undertema: "B", innholdstype: "2" },
      { undertema: "A", innholdstype: "1" },
    ] as ParsedGPArticle[];

    const result = getArticleCounts(articles);

    expect(result.undertemaCounts).toEqual({ A: 3, B: 2 });
    expect(result.innholdstypeCounts).toEqual({ "1": 3, "2": 2 });
  });

  test("should count articles correctly with undertema filter", () => {
    const articles = [
      { undertema: "A", innholdstype: "1" },
      { undertema: "A", innholdstype: "2" },
      { undertema: "B", innholdstype: "1" },
      { undertema: "B", innholdstype: "2" },
      { undertema: "A", innholdstype: "1" },
    ] as ParsedGPArticle[];

    const result = getArticleCounts(articles, "A");

    expect(result.undertemaCounts).toEqual({ A: 3, B: 2 });
    expect(result.innholdstypeCounts).toEqual({ "1": 2, "2": 1 });
  });

  test("should count articles correctly with innholdstype filter", () => {
    const articles = [
      { undertema: "A", innholdstype: "1" },
      { undertema: "A", innholdstype: "2" },
      { undertema: "B", innholdstype: "1" },
      { undertema: "B", innholdstype: "2" },
      { undertema: "A", innholdstype: "1" },
    ] as ParsedGPArticle[];

    const result = getArticleCounts(articles, undefined, "1");

    expect(result.undertemaCounts).toEqual({ A: 2, B: 1 });
    expect(result.innholdstypeCounts).toEqual({ "1": 3, "2": 2 });
  });

  test("should count articles correctly with both filters", () => {
    const articles = [
      { undertema: "A", innholdstype: "1" },
      { undertema: "A", innholdstype: "2" },
      { undertema: "B", innholdstype: "1" },
      { undertema: "B", innholdstype: "2" },
      { undertema: "A", innholdstype: "1" },
    ] as ParsedGPArticle[];

    const result = getArticleCounts(articles, "A", "1");

    expect(result.undertemaCounts).toEqual({ A: 2, B: 1 });
    expect(result.innholdstypeCounts).toEqual({ "1": 2, "2": 1 });
  });

  test("should return empty counts when articles array is empty", () => {
    const articles: ParsedGPArticle[] = [];
    const result = getArticleCounts(articles);
    expect(result.undertemaCounts).toEqual({});
    expect(result.innholdstypeCounts).toEqual({});
  });

  test("should count articles correctly when all articles have the same undertema and innholdstype", () => {
    const articles = Array(5).fill({
      undertema: "A",
      innholdstype: "1",
    }) as ParsedGPArticle[];
    const result = getArticleCounts(articles);
    expect(result.undertemaCounts).toEqual({ A: 5 });
    expect(result.innholdstypeCounts).toEqual({ "1": 5 });
  });

  test("should return empty counts when filters do not match any articles", () => {
    const articles = [
      { undertema: "A", innholdstype: "1" },
      { undertema: "B", innholdstype: "2" },
    ] as ParsedGPArticle[];
    const result = getArticleCounts(articles, "C", "3");
    expect(result.undertemaCounts).toEqual({ A: 0, B: 0 });
    expect(result.innholdstypeCounts).toEqual({ 1: 0, 2: 0 });
  });
});
