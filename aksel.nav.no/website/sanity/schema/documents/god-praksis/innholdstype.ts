import { defineField, defineType } from "sanity";

export const Innholdstype = defineType({
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
      description:
        "En kort introduksjon til innholdstypen og veiledning for hva den innebærer.",
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
