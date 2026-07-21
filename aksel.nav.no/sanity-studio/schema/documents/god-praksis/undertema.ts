import { defineField, defineType } from "sanity";

export const Undertema = defineType({
  name: "gp.tema.undertema",
  title: "Undertema",
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
      description: "En kort introduksjon til undertemaet for leser.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tema",
      title: "Tema",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "gp.tema" }],
      options: {
        disableNew: true,
      },
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
