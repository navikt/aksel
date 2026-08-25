import { defineField, defineType } from "sanity";
import { MigrationIcon } from "@navikt/aksel-icons";

export const CompareImages = defineType({
  title: "Sammenlign bilder",
  name: "compare_images",
  type: "object",
  icon: () => <MigrationIcon aria-hidden />,
  fields: [
    defineField({
      title: "Bilde 1",
      name: "image_1",
      type: "image",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Bilde 1 må ha alt-tekst."),
        }),
      ],
    }),
    defineField({
      title: "Bilde 2",
      name: "image_2",
      type: "image",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Bilde 2 må ha alt-tekst."),
        }),
      ],
    }),
    defineField({
      name: "caption",
      title: "Bildetekst",
      type: "string",
    }),
    defineField({
      name: "border",
      title: "Border",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "background",
      title: "Bakgrunnsfarge",
      type: "color",
    }),
  ],
});
