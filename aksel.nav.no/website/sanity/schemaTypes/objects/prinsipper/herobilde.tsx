import React from "react";
import { defineField, defineType } from "sanity";
import { ImageIcon } from "@navikt/aksel-icons";

export const HeroBilde = defineType({
  title: "Hero bilde",
  name: "herobilde",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt-tekst",
      type: "string",
      validation: (Rule) => Rule.required().error("Bilde må ha en alt-tekst"),
      description: "Beskriv bildet for skjermlesere",
    }),
  ],
  preview: {
    select: {
      alt: "alt",
    },
    prepare(selection) {
      return {
        title: selection?.alt,
        subtitle: `Bilde`,
        media: () => <ImageIcon />,
      };
    },
  },
});
