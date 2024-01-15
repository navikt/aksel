import { defineField, defineType } from "sanity";

export const ArticleViews = defineType({
  title: "ArticleViews",
  name: "aksel_article_views",
  type: "document",
  fields: [
    defineField({
      type: "number",
      name: "views",
      readOnly: true,
    }),
    defineField({
      title: "articleRef",
      name: "article_ref",
      type: "reference",
      to: { type: "aksel_artikkel" },
      readOnly: true,
    }),
  ],
});
