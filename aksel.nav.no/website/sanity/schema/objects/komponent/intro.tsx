import { Home } from "@navikt/ds-icons";
import React from "react";
import { defineField, defineType } from "sanity";

export const KomponentIntro = defineType({
  title: "Intro",
  name: "intro_komponent",
  type: "object",
  fields: [
    defineField({
      title: "Intro-tekst",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error("Komponentintro må ha en intro"),
    }),
    defineField({
      type: "array",
      name: "brukes_til",
      title: "Egnet til å:",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      type: "array",
      name: "brukes_ikke_til",
      title: "Vurder noe annet: (optional)",
      of: [{ type: "string" }],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return {
        title: "Komponent-intro",
        media: () => <Home />,
      };
    },
  },
});
