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
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "old",
          title: "Gammel",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "new",
          title: "Ny",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "templateUsage",
      title: "Bruk av maler",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "old",
          title: "Gammel",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "new",
          title: "Ny",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "uniqueRepo",
      title: "Unike repoer",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "old",
          title: "Gammel",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "new",
          title: "Ny",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "versionStatistics",
      title: "Versjonsstatistikk",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "currentMajor",
          title: "Nåværende major",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "latestMajorPercentage",
          title: "Siste major prosent",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "latestMajorChangeCount",
          title: "Endring i siste major",
          type: "number",
          validation: (Rule) => Rule.required(),
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
