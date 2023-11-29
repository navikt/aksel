import { defineField, defineType } from "sanity";
import { sanitizeSlug } from "../../../schema/util";

export default defineType({
  name: "gp.tema",
  title: "Tema",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Permalink",
      description: "En mer sanitert visning av tema-navnet til url ene",
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required().error("Tema må ha en URL"),
      options: {
        source: "title",
        slugify: sanitizeSlug,
      },
    }),
    defineField({
      title: "Beskrivelse",
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "alias",
      title: "Aliaser",
      description: "Hjelper med å gi bedre søketreff internt i admin-løsning",
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
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
