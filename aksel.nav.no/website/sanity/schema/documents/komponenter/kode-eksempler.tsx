/* import { ExampleKeys } from "website/component-examples"; */

import { defineField, defineType } from "sanity";

export const KodeEksempelDoc = defineType({
  title: "Komponenteksempler designsystemet",
  name: "kode_eksempler_fil",
  type: "document",
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
      options: {
        list: [
          {
            title: "Eksempler",
            value: "eksempler",
          },
          {
            title: "Templates",
            value: "templates",
          },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Filer",
      name: "filer",
      type: "array",
      readOnly: true,
      of: [
        {
          title: "Data i filer",
          name: "fil",
          type: "object",
          fields: [
            { title: "Filnavn", name: "navn", type: "string" },
            { title: "Innhold", name: "innhold", type: "string" },
            { title: "Beskrivelse", name: "description", type: "text" },
            { title: "Index", name: "index", type: "number" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
  __experimental_omnisearch_visibility: false,
});
