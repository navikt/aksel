import { groups, SEOFields } from "@/lib";

export default {
  title: "Forside",
  name: "vk_frontpage",
  type: "document",
  groups,
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required(),
    },
    {
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
        },
      ],
    },
    SEOFields,
  ],
};
