import { GpGroupedArticlesT } from "../interface";
import { getArticleList } from "./get-article-list";

const baseArticle = (
  id: string,
  publishedAt: string | null
): GpGroupedArticlesT[number] => ({
  innholdstype: "type1",
  undertema: "tema1",
  article: {
    _id: id,
    heading: `Article ${id}`,
    ingress: "ingress",
    undertema: ["tema1", "tema2"],
    innholdstype: "type1",
    slug: "url",
    publishedAt,
  },
});

describe("getArticleList function", () => {
  test("should return an empty array when no articles match the filters", () => {
    const articles = [
      baseArticle("1", "2022-01-01"),
      baseArticle("2", "2022-01-02"),
    ];
    const result = getArticleList(articles, "type2", "tema2");
    expect(result).toEqual([]);
  });

  test("should correctly filter articles by innholdstype", () => {
    const articles = [
      baseArticle("2", "2022-01-02"),
      baseArticle("1", "2022-01-01"),
    ];
    const result = getArticleList(articles, "type1", null);
    expect(result).toEqual(articles);
  });

  test("should correctly filter articles by undertema", () => {
    const articles = [
      baseArticle("2", "2022-01-02"),
      baseArticle("1", "2022-01-01"),
    ];
    const result = getArticleList(articles, null, "tema1");
    expect(result).toEqual(articles);
  });

  test("should correctly sort articles by publishedAt", () => {
    const articles = [
      baseArticle("2", "2022-01-01"),
      baseArticle("3", "2022-01-03"),
      baseArticle("4", "2022-01-04"),
      baseArticle("1", "2022-01-02"),
    ];
    const result = getArticleList(articles, "type1", "tema1");
    expect(result).toEqual([
      baseArticle("4", "2022-01-04"),
      baseArticle("3", "2022-01-03"),
      baseArticle("1", "2022-01-02"),
      baseArticle("2", "2022-01-01"),
    ]);
  });

  test("should correctly limit the number of articles to 9", () => {
    const articles = Array.from({ length: 10 }, (_, i) =>
      baseArticle(String(i + 1), `2022-01-0${i + 1}`)
    );
    const result = getArticleList(articles, "type1", "tema1");
    expect(result.length).toEqual(9);
  });

  test("should return all articles when no filter is set", () => {
    const articles = Array.from({ length: 10 }, (_, i) =>
      baseArticle(String(i + 1), `2022-01-0${i + 1}`)
    );
    const result = getArticleList(articles, null, null);
    expect(result.length).toEqual(9);
  });
});
