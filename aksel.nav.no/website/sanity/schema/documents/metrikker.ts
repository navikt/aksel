import { defineField, defineType } from "sanity";
import { allDocsRef } from "../../config";

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
    }),
    defineField({
      type: "number",
      name: "avgScrollLength",
      title: "Gjennomsnittlig scrolldybde",
      ...config,
    }),
    defineField({
      type: "number",
      name: "avgTime",
      title: "Gjennomsnittlig tid på siden",
      ...config,
    }),
    defineField({
      type: "object",
      name: "weeksObj",
      title: "Uker",
      ...configCollapsed,
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
              ],
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
    },
    prepare(selection) {
      const { reference, referenceId } = selection;
      return {
        title: reference || "Mangler tittel",
        subtitle: `ID: ${referenceId}`,
      };
    },
  },
});

const isDeveloper = (currentUser: any) => {
  const { roles } = currentUser;

  return !roles.some(({ name }) => name === "developer");
};
