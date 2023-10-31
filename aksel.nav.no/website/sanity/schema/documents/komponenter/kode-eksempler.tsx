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
      title: "Variant",
      name: "variant",
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
    defineField({
      title: "Metadata",
      name: "metadata",
      type: "object",
      readOnly: true,
      fields: [
        defineField({
          title: "Version",
          name: "version",
          type: "string",
        }),
        defineField({
          title: "Changelog",
          name: "changelog",
          type: "array",
          of: [
            {
              title: "Changelog-entry",
              name: "entry",
              type: "object",
              fields: [
                { title: "Description", name: "description", type: "string" },
                { title: "Version", name: "version", type: "string" },
                { title: "Date", name: "date", type: "string" },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
    },
    prepare(selection) {
      const { title, variant } = selection;
      return {
        title,
        subtitle: variant,
      };
    },
  },
  __experimental_omnisearch_visibility: false,
});
