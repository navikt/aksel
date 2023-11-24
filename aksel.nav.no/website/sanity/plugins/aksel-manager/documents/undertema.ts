import { defineField, defineType } from "sanity";

export default defineType({
  name: "gp.tema.tag",
  title: "Tema tag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tema",
      title: "Tema",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "gp.tema" }],
      readOnly: true,
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: "labels",
      title: "Labels",
      type: "array",
      validation: (Rule) => Rule.unique(),
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    {
      title: "Tittel",
      name: "title",
      by: [{ field: "title", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      tema: "tema.title",
    },
    prepare({ title, tema }) {
      return {
        title,
        subtitle: tema,
      };
    },
  },
});
