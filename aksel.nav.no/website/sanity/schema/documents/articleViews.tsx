import { defineField, defineType } from "sanity";

export const ArticleViews = defineType({
  title: "ArticleViews",
  name: "aksel_article_views",
  type: "document",
  fields: [
    defineField({
      type: "number",
      name: "views",
      description: "total lifetime views",
      readOnly: true,
    }),
    defineField({
      type: "number",
      name: "views_week",
      description: "views in the last week",
      readOnly: true,
    }),
    defineField({
      type: "number",
      name: "views_month",
      description: "views in the last month",
      readOnly: true,
    }),
    defineField({
      type: "number",
      name: "views_year",
      description: "views in the last year",
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
