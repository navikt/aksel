import { defineField, defineType } from "sanity";
import SanityTabGroups from "../../../schema/documents/presets/groups";
import BaseSEOPreset from "../../../schema/documents/presets/seo";
import { sanitizeSlug } from "../../../util";

export const Tema = defineType({
  name: "gp.tema",
  title: "Tema",
  type: "document",
  groups: SanityTabGroups,
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Temakontakter",
      name: "contacts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editorial_staff" }] }],
    }),
    defineField({
      name: "alias",
      title: "Aliaser",
      description: "Hjelper med å gi bedre søketreff internt i admin-løsning",
      type: "array",
      validation: (Rule) => Rule.unique(),
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Pictogram",
      name: "pictogram",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Attribution",
          hidden: true,
          initialValue: "Tema-illustrasjon",
        },
      ],
      validation: (Rule) => Rule.required().error("Tema må ha pictogram"),
    }),
    defineField({
      title: "Pictogram invertert",
      name: "pictogramInverted",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Attribution",
          hidden: true,
          initialValue: "Tema-illustrasjon",
        },
      ],
      validation: (Rule) =>
        Rule.required().error("Tema må ha et invertert pictogram"),
    }),
    BaseSEOPreset,
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
