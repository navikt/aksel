import { defineField } from "sanity";

export const metrics = defineField({
  name: "metrics",
  type: "object",
  title: "Statistikk",
  group: "metrics",
  fields: [
    {
      type: "object",
      name: "pageviews",
      fields: [
        {
          name: "summary",
          type: "number",
        },
        {
          name: "week",
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
              ],
            },
          ],
        },
      ],
    },
  ],
});
