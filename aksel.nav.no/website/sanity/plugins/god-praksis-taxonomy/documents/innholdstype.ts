import { defineField, defineType } from "sanity";

export default defineType({
  name: "gp.innholdstype",
  title: "Innholdstype",
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
      description: "En kort introduksjon til innholdstypen for leser.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "explanation",
      title: "Forklaring / veiledning",
      description:
        "En mer detaljert forklaring av innholdstypen for redaktører. F.eks bakgrunn og veiledning for bruk av innholdstypen.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
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
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
