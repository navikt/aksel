import { defineField, defineType } from "sanity";

export const ArticleViews = defineType({
  title: "Artikkel Visninger",
  name: "article_views",
  type: "document",
  readOnly: ({ currentUser }) =>
    !currentUser.roles.find((x) => x.name === "developer"),
  fields: [
    defineField({
      type: "number",
      name: "views",
      description: "total lifetime views",
    }),
    defineField({
      type: "number",
      name: "views_week",
      description: "views in the last week",
    }),
    defineField({
      type: "number",
      name: "views_month",
      description: "views in the last month",
    }),
    defineField({
      type: "number",
      name: "views_year",
      description: "views in the last year",
    }),
    defineField({
      title: "articleRef",
      name: "article_ref",
      type: "reference",
      to: { type: "aksel_artikkel" },
    }),
    defineField({
      type: "string",
      name: "url",
    }),
  ],
});
