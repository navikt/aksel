import { defineField, defineType } from "sanity";
import { LineGraphIcon } from "@navikt/aksel-icons";

export const ArticleViews = defineType({
  title: "Artikkel Visninger",
  name: "article_views",
  type: "document",
  readOnly: ({ currentUser }) =>
    !currentUser.roles.find((x) => x.name === "developer"),
  preview: {
    select: {
      title: "article_ref.heading",
      url: "article_ref.slug.current",
    },
    prepare: (selected) => ({
      title: selected.title,
      subtitle: selected.url,
      media: LineGraphIcon,
    }),
  },
  orderings: [
    {
      title: "Views total",
      name: "views",
      by: [{ field: "views", direction: "desc" }],
    },
    {
      title: "Views week",
      name: "views_week",
      by: [{ field: "views_week", direction: "desc" }],
    },
    {
      title: "Views month",
      name: "views_month",
      by: [{ field: "views_month", direction: "desc" }],
    },
    {
      title: "Views year",
      name: "views_year",
      by: [{ field: "views_year", direction: "desc" }],
    },
  ],
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
      weak: true,
      to: { type: "aksel_artikkel" },
    }),
    defineField({
      type: "string",
      name: "url",
    }),
  ],
});
