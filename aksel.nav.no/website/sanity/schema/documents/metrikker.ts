import { getWeek } from "date-fns";
import { defineField, defineType } from "sanity";
import { allDocsRef } from "../../config";

export const Metrikker = defineType({
  title: "Metrikker",
  name: "metrics",
  type: "document",
  fields: [
    defineField({
      type: "reference",
      name: "reference",
      title: "Referanse",
      to: allDocsRef,
      readOnly: true,
    }),
    defineField({
      type: "number",
      name: "pageviews",
      title: "Sidevisninger",
      readOnly: true,
    }),
    defineField({
      type: "number",
      name: "avgScrollLength",
      title: "Gjennomsnittlig scrolldybde %",
      readOnly: true,
    }),
    defineField({
      type: "number",
      name: "avgTime",
      title: "Gjennomsnittlig tid på siden",
      readOnly: true,
    }),
    defineField({
      type: "object",
      name: "weeksObj",
      title: "Uker",
      readOnly: true,
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "weeks",
          type: "array",
          title: " ",
          of: [
            {
              type: "object",
              name: "week_summary",
              fields: [
                {
                  name: "week",
                  type: "date",
                },
                {
                  name: "views",
                  type: "number",
                },
                {
                  name: "scrollLength",
                  type: "number",
                },
                {
                  name: "time",
                  type: "number",
                },
              ],
              preview: {
                select: {
                  week: "week",
                  views: "views",
                  scrollLength: "scrollLength",
                  time: "time",
                },
                prepare(selection) {
                  const { week, views, scrollLength, time } = selection;
                  return {
                    title: `Uke: ${getWeek(new Date(week))} | År: ${new Date(
                      week
                    ).getFullYear()}`,
                    subtitle: `Visninger: ${views} | Scroll: ${scrollLength}% | Tid: ${time}s`,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      reference: "reference.title",
      referenceId: "reference._id",
      slug: "reference.slug.current",
    },
    prepare(selection) {
      const { reference, referenceId, slug } = selection;
      return {
        title: reference || slug || referenceId || `ID: ${referenceId}`,
        subtitle: `ID: ${referenceId}`,
      };
    },
  },
});
