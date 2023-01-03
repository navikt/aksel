import { defineField } from "sanity";
import { Metrics } from "../../custom-components";

const config = {
  description: "Bare synlig for utviklere",
  readOnly: true,
  hidden: ({ currentUser }) => isDeveloper(currentUser),
};

const configCollapsed = {
  ...config,
  options: {
    collapsible: true,
    collapsed: true,
  },
};

export const metrics = defineField({
  name: "metrics",
  type: "object",
  title: "Statistikk",
  group: "metrics",
  fields: [
    defineField({
      type: "string",
      name: "dataVis",
      title: " ",
      components: {
        input: Metrics,
      },
    }),
    defineField({
      type: "object",
      name: "pageviews",
      ...configCollapsed,
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
      ...config,
    }),
    defineField({
      type: "number",
      name: "avgTime",
      ...config,
    }),
    defineField({
      type: "number",
      name: "inactiveCount",
      ...config,
    }),
  ],
});

const isDeveloper = (currentUser: any) => {
  const { roles } = currentUser;
  return roles.find(({ name }) => name === "developer");
};
