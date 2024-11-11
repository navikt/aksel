import { defineField, defineType } from "sanity";
import { LineGraphIcon } from "@navikt/aksel-icons";

export const ArticleViews = defineType({
  title: "Artikkelvisninger",
  name: "article_views",
  type: "document",
  readOnly: ({ currentUser }) =>
    !currentUser?.roles.find((x) => x.name === "developer"),
  preview: {
    select: {
      title: "article_ref.heading",
      url: "article_ref.slug.current",
    },
    prepare: (selected) => ({
      title: selected.title,
      subtitle: selected.url,
      media: () => <LineGraphIcon aria-hidden />,
    }),
  },
  orderings: [
    {
      title: "Views day",
      name: "views_day",
      by: [{ field: "views_day", direction: "desc" }],
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
      name: "views_day",
      title: "Visninger i de siste 24 timer",
    }),
    defineField({
      type: "number",
      name: "views_week",
      title: "Visninger siste 7 dager",
    }),
    defineField({
      type: "number",
      name: "views_month",
      title: "Visninger siste 30 dager",
    }),
    defineField({
      type: "number",
      name: "views_year",
      title: "Visninger siste 365 dager",
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
