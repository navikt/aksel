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
          { title: "Ikonsøk", value: "ikonsok" },
          { title: "Endringslogg", value: "endringslogg" },
          { title: "Komponentoversikt", value: "komponentoversikt" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Farge kategori",
      type: "reference",
      name: "farge_ref",
      hidden: ({ parent }) => parent.modul !== "farge_kategori",
      to: [{ type: "ds_color_categories" }],
    },
  ],
  preview: {
    select: {
      modul: "modul",
    },
    prepare(s) {
      return {
        title: s.modul,
        subtitle: "Spesial seksjon",
        media: () => <Star />,
      };
    },
  },
};
