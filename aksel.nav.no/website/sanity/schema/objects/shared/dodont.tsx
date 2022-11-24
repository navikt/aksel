import { Success } from "@navikt/ds-icons";
import React from "react";
import { defineField, defineType } from "sanity";

export const DoDont = defineType({
  title: "Do / Dont",
  name: "do_dont",
  type: "object",
  icon: Success,
  fields: [
    defineField({
      type: "array",
      name: "blokker",
      title: "Do / donts",
      of: [{ type: "do_dont_block" }],
      validation: (Rule) => Rule.required().max(4),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Do / Dont",
        media: () => <Success />,
      };
    },
  },
});

export const DoDontBlock = defineType({
  title: "DoDont",
  name: "do_dont_block",
  type: "object",
  fields: [
    defineField({
      title: "Fullwidth",
      description: "Tar opp ~ 40% eller 100% av tilgjengelig bredde",
      name: "fullwidth",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
    defineField({
      title: "Bilde",
      name: "picture",
      type: "image",
      validation: (Rule) =>
        Rule.required().error("Do/dont må ha et bilde lagt til"),
    }),
    defineField({
      title: "alt tekst for bilde",
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required().error("Do/dont må ha en alt-tekst"),
    }),
    defineField({
      name: "description",
      title: "Fritekst",
      description:
        "Korte konsise beskrivelser. Bruk fullbredde bilde i dodont med egen tekst for lengre forklaringer",
      type: "text",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Do", value: "do" },
          { title: "Dont", value: "dont" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "do",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
