import { GpArticleT } from "../types";
import { groupArticles } from "./group-articles";

const baseArticle = (id: string): GpArticleT => ({
  _id: id,
  heading: `Article ${id}`,
  ingress: "ingress",
  undertema: ["tema1", "tema2"],
  innholdstype: "metode",
  slug: "url",
  publishedAt: null,
});

describe("groupArticles function", () => {
  test("should return an empty array when both innholdstyper and undertema are empty", () => {
    const result = groupArticles({
      initialInnholdstype: [],
      initialUndertema: [],
    });
    expect(result).toEqual([]);
  });

  test("should correctly group articles by innholdstype", () => {
    const initialInnholdstype = [
      {
        title: "type1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
    ];
    const result = groupArticles({ initialInnholdstype, initialUndertema: [] });

    expect(result).toEqual([
      {
        innholdstype: "type1",
        undertema: null,
        article: baseArticle("1"),
      },
      {
        innholdstype: "type1",
        undertema: null,
        article: baseArticle("2"),
      },
    ]);
  });

  test("should correctly group articles by undertema", () => {
    const initialUndertema = [
      {
        title: "tema1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
    ];
    const result = groupArticles({ initialInnholdstype: [], initialUndertema });
    expect(result).toEqual([
      {
        innholdstype: null,
        undertema: "tema1",
        article: baseArticle("1"),
      },
      {
        innholdstype: null,
        undertema: "tema1",
        article: baseArticle("2"),
      },
    ]);
  });

  test("should correctly group overlapping articles", () => {
    const initialInnholdstype = [
      {
        title: "type1",
        articles: [baseArticle("1")],
      },
    ];
    const initialUndertema = [
      {
        title: "tema1",
        articles: [baseArticle("1")],
      },
    ];
    const result = groupArticles({ initialInnholdstype, initialUndertema });
    expect(result).toEqual([
      {
        innholdstype: "type1",
        undertema: "tema1",
        article: baseArticle("1"),
      },
    ]);
  });

  test("should return an empty array when innholdstyper and undertema have no articles", () => {
    const result = groupArticles({
      initialInnholdstype: [{ title: "type1", articles: [] }],
      initialUndertema: [{ title: "tema1", articles: [] }],
    });
    expect(result).toEqual([]);
  });

  test("should correctly group multiple articles from multiple innholdstyper and undertema", () => {
    const initialInnholdstype = [
      {
        title: "type1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
      {
        title: "type2",
        articles: [baseArticle("3"), baseArticle("4")],
      },
    ];
    const initialUndertema = [
      {
        title: "tema1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
      {
        title: "tema2",
        articles: [baseArticle("3"), baseArticle("4")],
      },
    ];
    const result = groupArticles({ initialInnholdstype, initialUndertema });
    expect(result).toEqual([
      {
        innholdstype: "type1",
        undertema: "tema1",
        article: baseArticle("1"),
      },
      {
        innholdstype: "type1",
        undertema: "tema1",
        article: baseArticle("2"),
      },
      {
        innholdstype: "type2",
        undertema: "tema2",
        article: baseArticle("3"),
      },
      {
        innholdstype: "type2",
        undertema: "tema2",
        article: baseArticle("4"),
      },
    ]);
  });
});
