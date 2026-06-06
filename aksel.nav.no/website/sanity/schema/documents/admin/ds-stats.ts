import { defineField, defineType } from "sanity";

export const DesignsystemStatistics = defineType({
  name: "designsystemStatistics",
  title: "Designsystem Statistics",
  type: "document",
  fields: [
    defineField({
      name: "componentUsage",
      title: "Komponentbruk",
      type: "object",
      fields: [
        defineField({
          name: "old",
          title: "Gammel",
          type: "number",
        }),
        defineField({
          name: "new",
          title: "Ny",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "uniqueRepo",
      title: "Unike repoer",
      type: "object",
      fields: [
        defineField({
          name: "old",
          title: "Gammel",
          type: "number",
        }),
        defineField({
          name: "new",
          title: "Ny",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "versionStatistics",
      title: "Versjonsstatistikk",
      type: "object",
      fields: [
        defineField({
          name: "currentMajor",
          title: "Nåværende major",
          type: "number",
        }),
        defineField({
          name: "latestMajor",
          title: "Siste major",
          type: "string",
        }),
        defineField({
          name: "latestMajorChange",
          title: "Endring i siste major",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => {
      return { title: "Designsystem statistikk" };
    },
  },
  readOnly: false,
  __experimental_omnisearch_visibility: false,
});
