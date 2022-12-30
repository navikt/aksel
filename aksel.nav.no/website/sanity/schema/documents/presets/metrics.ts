import { defineField } from "sanity";
import { Metrics } from "../../custom-components";

export const metrics = defineField({
  name: "metrics",
  type: "object",
  title: "Statistikk",
  group: "metrics",
  fields: [
    defineField({
      type: "object",
      name: "pageviews",
      fields: [
        {
          name: "summary",
          type: "number",
        },
        {
          name: "weeks",
          type: "array",
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
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      type: "number",
      name: "avgScrollLength",
    }),
    defineField({
      type: "number",
      name: "avgTime",
    }),
    defineField({
      type: "number",
      name: "inactiveCount",
    }),
    defineField({
      type: "string",
      name: "dataVis",
      title: " ",
      components: {
        input: Metrics,
      },
    }),
  ],
});
