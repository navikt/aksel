// Usikker på om skal være med videre

import { FileTextIcon } from "@navikt/aksel-icons";
import React from "react";
import { defineField, defineType } from "sanity";

export const InnholdsKort = defineType({
  title: "Innholdskort",
  name: "innholdskort",
  type: "object",
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Innholdskort må ha en beskrivende tittel"),
    }),
    defineField({
      title: "Lenke til prinsipp",
      name: "lenke",
      type: "reference",
      to: [{ type: "aksel_prinsipp" }],
      validation: (Rule) =>
        Rule.required().error("Innholdskort må ha en lenke"),
    }),
    defineField({
      title: "Innhold",
      description: "Ikke bruk lenker inne i selve kortet",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error("Innholdskort må ha noe beskrivende innhold"),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((_, { document }: any) => {
      if (!document?.prinsipp?.hovedside) {
        return "Innholdskort kan bare brukes på 'hovedsiden' til prinsippet";
      }

      return true;
    }),
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: selection?.title,
        subtitle: `Innholdskort`,
        media: () => <FileTextIcon />,
      };
    },
  },
});
