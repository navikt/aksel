import { Picture } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Bilde",
  name: "bilde",
  type: "image",
  icon: Picture,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alt-tekst",
      type: "string",
      validation: (Rule) => Rule.required().error("Bilde må ha en alt-tekst"),
      description: "Beskriv bildet for skjermlesere",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "caption",
      title: "Bilde-tekst (optional)",
      description: "Dette vil stå under bildet",
      type: "string",
      hidden: ({ parent }) => parent?.floating,
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "small",
      title: "Bildet tar bare ~halve bredden",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.floating || parent?.hide_floating,
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Kilde",
      type: "object",
      name: "kilde",
      options: {
        isHighlighted: true,
        collapsible: true,
      },
      fields: [
        {
          title: "Legg til kilde",
          name: "har_kilde",
          type: "boolean",
          initialValue: false,
        },
        {
          title: "Kilde-prefix",
          name: "prefix",
          type: "string",
          options: {
            list: [
              { title: "FOTO:", value: "FOTO" },
              { title: "Kilde:", value: "Kilde" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
          hidden: ({ parent }) => !parent?.har_kilde,
        },
        {
          title: "Tekst",
          name: "tekst",
          type: "string",
          hidden: ({ parent }) => !parent?.har_kilde,
        },
        {
          title: "Lenke-kilde",
          description: "Kilde-teksten blir satt som lenke",
          name: "link",
          type: "url",
          hidden: ({ parent }) => !parent?.har_kilde,
        },
      ],
    },
  ],
  validation: (Rule) =>
    Rule.custom((v) => {
      return v?.asset ? true : "Må legge til et bilde";
    }).error(),
  preview: {
    select: {
      alt: "alt",
      floating: "floating",
    },
    prepare(selection) {
      return {
        title: selection?.alt,
        subtitle: `Bilde`,
        media: () => <Picture />,
      };
    },
  },
};
