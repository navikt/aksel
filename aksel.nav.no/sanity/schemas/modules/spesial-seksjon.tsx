import { Star } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Sidemodul",
  type: "object",
  name: "spesial_seksjon",
  icon: Star,
  validation: (Rule) => Rule.required(),
  fields: [
    {
      title: "Modul",
      name: "modul",
      type: "string",
      options: {
        list: [
          { title: "Farge kategori", value: "farge_kategori" },
          { title: "Token kategori", value: "token_kategori" },
          { title: "Ikonsøk", value: "ikonsok" },
          { title: "Endringslogg", value: "endringslogg" },
          { title: "Komponentoversikt", value: "komponentoversikt" },
          /* ...Object.keys(docs).map((x) => ({
            title: `Tokenvisning: ${x}`,
            value: `tokens_${x}`,
          })), */
        ],
        layout: "radio",
      },
    },
    {
      title: "Token kategori",
      type: "reference",
      name: "token_ref",
      hidden: ({ parent }) => parent.modul !== "token_kategori",
      to: [{ type: "token_kategori" }],
    },
  ],
  preview: {
    select: {
      modul: "modul",
    },
    prepare(s) {
      return {
        title: s.modul,
        subtitle: "Sidemodul",
        media: () => <Star />,
      };
    },
  },
};
