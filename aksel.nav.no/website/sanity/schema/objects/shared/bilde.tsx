import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const Bilde = defineType({
  title: "Bilde",
  name: "bilde",
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
    defineField({
      name: "caption",
      title: "Bilde-tekst (optional)",
      description: "Dette vil stå under bildet",
      type: "string",
      hidden: ({ parent }) => parent?.floating,
    }),
    defineField({
      name: "small",
      title: "Bildet tar bare ~halve bredden",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.floating || parent?.hide_floating,
    }),
    defineField({
      title: "Kilde",
      type: "object",
      name: "kilde",
      options: {
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
    }),
    defineField({
      name: "background",
      title: "Bakgrunnsfarge",
      description: "Husk å dobbelsjekke kontrast!",
      type: "color",
    }),
  ],
  validation: (Rule) =>
    Rule.custom((v) => {
      return v?.asset ? true : "Må legge til et bilde";
    }).error(),
});
