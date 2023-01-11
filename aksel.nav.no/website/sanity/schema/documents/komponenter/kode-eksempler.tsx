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
      title: "Toggle om eksemplet er et dir eller filnavn",
      name: "dir",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
      readOnly: true,
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
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      dir: "dir",
    },
    prepare(selection) {
      const { title, dir } = selection;
      return {
        title: title,
        subtitle: dir ? "Alle kode-eksempler" : "Spesifikt kode-eksempel",
      };
    },
  },
  __experimental_omnisearch_visibility: false,
});
