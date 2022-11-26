import { Star } from "@navikt/ds-icons";
import React from "react";
import { defineField, defineType } from "sanity";

export const UnikSidemodul = defineType({
  title: "Unik Sidemodul",
  type: "object",
  name: "spesial_seksjon",
  icon: Star,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      title: "Modul",
      name: "modul",
      type: "string",
      options: {
        list: [
          { title: "Token kategori", value: "token_kategori" },
          { title: "Ikonsøk", value: "ikonsok" },
          { title: "Komponentoversikt", value: "komponentoversikt" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Token kategori",
      type: "reference",
      name: "token_ref",
      hidden: ({ parent }) => parent.modul !== "token_kategori",
      to: [{ type: "token_kategori" }],
    }),
  ],
  preview: {
    select: {
      modul: "modul",
    },
    prepare(s) {
      return {
        title: s.modul,
        subtitle: "Unik Sidemodul",
        media: () => <Star />,
      };
    },
  },
});
