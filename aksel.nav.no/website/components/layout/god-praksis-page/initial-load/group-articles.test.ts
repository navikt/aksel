import { GpArticleListT } from "../types";
import { groupArticles } from "./group-articles";

const baseArticle = (id: string): GpArticleListT["articles"][number] => ({
  _id: id,
  heading: `Article ${id}`,
  ingress: "ingress",
  undertema: ["tema1", "tema2"],
  innholdstype: "metode",
  slug: "url",
});

describe("groupArticles function", () => {
  test("should return an empty array when both innholdstyper and undertema are empty", () => {
    const result = groupArticles({ innholdstyper: [], undertema: [] });
    expect(result).toEqual([]);
  });

  test("should correctly group articles by innholdstype", () => {
    const innholdstyper = [
      {
        title: "type1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
    ];
    const result = groupArticles({ innholdstyper, undertema: [] });

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
    const undertema = [
      {
        title: "tema1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
    ];
    const result = groupArticles({ innholdstyper: [], undertema });
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
    const innholdstyper = [
      {
        title: "type1",
        articles: [baseArticle("1")],
      },
    ];
    const undertema = [
      {
        title: "tema1",
        articles: [baseArticle("1")],
      },
    ];
    const result = groupArticles({ innholdstyper, undertema });
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
      innholdstyper: [{ title: "type1", articles: [] }],
      undertema: [{ title: "tema1", articles: [] }],
    });
    expect(result).toEqual([]);
  });

  test("should correctly group multiple articles from multiple innholdstyper and undertema", () => {
    const innholdstyper = [
      {
        title: "type1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
      {
        title: "type2",
        articles: [baseArticle("3"), baseArticle("4")],
      },
    ];
    const undertema = [
      {
        title: "tema1",
        articles: [baseArticle("1"), baseArticle("2")],
      },
      {
        title: "tema2",
        articles: [baseArticle("3"), baseArticle("4")],
      },
    ];
    const result = groupArticles({ innholdstyper, undertema });
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
