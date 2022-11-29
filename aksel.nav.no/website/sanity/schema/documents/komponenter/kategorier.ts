import { defineField, defineType } from "sanity";

export const KomponentKategorier = defineType({
  title: "Komponentkategorier",
  name: "kategorier_komponent",
  type: "document",
  fields: [
    defineField({
      name: "kategorier",
      type: "array",
      title: "Kategorier",
      of: [
        defineField({
          name: "kategori",
          type: "object",
          title: "Kategori",
          fields: [
            defineField({
              name: "navn",
              type: "string",
              title: "Navn",
            }),
            defineField({
              name: "beskrivelse",
              type: "riktekst_enkel",
              title: "Beskrivelse",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      kategorier: "kategorier",
    },
    prepare: ({ kategorier }) => ({
      title: `Kategorier: ${kategorier.length ?? 0}`,
    }),
  },
  __experimental_omnisearch_visibility: false,
});
