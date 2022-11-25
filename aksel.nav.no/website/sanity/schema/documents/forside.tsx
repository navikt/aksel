import { groups } from "./presets";
import { defineField, defineType } from "sanity";

export const Forside = defineType({
  title: "Forside Aksel",
  name: "vk_frontpage",
  type: "document",
  groups,
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    /* defineField({
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required(),
    }), */
    defineField({
      title: "Brukeropplevelse",
      name: "prinsipp_1",
      type: "object",
      fields: [
        {
          title: "Vis på forside",
          name: "vis",
          type: "boolean",
          validation: (Rule) => Rule.required(),
        },

        // TODO: Uncomment etter migrering av docs
        /*
        {
          title: "Beskrivelse",
          name: "beskrivelse",
          type: "riktekst_enkel",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Hovedside",
          name: "hovedside",
          type: "reference",
          weak: true,
          to: [{ type: "aksel_prinsipp" }],
        },
        {
          title: "Undersider",
          description: "Rekkefølge bestemmer rekkefølgen på forsiden!",
          name: "undersider",
          type: "array",
          of: [
            { type: "reference", weak: true, to: [{ type: "aksel_prinsipp" }] },
          ],
        },*/
      ],
    }),
    defineField({ type: "seo", title: "Seo", name: "seo" }),
  ],
});
