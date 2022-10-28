import { Picture } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Hero bilde",
  name: "herobilde",
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
  ],
  preview: {
    select: {
      alt: "alt",
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
