import { UlistIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const PropsSeksjon = defineType({
  title: "Props",
  name: "props_seksjon",
  type: "object",
  icon: UlistIcon,
  fields: [
    defineField({
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      initialValue: "Props",
      readOnly: true,
    }),
    defineField({
      title: "Props",
      type: "array",
      name: "komponenter",
      of: [
        defineField({
          title: "Komponent",
          type: "object",
          name: "komponent",
          fields: [
            {
              title: "Komponent navn",
              description: "Slik man ville brukt den, eks Accordion.Item",
              type: "string",
              name: "title",
            },
            {
              title: "Bruker komponenten OverridableComponent API-et",
              type: "boolean",
              name: "overridable",
              initialValue: false,
            },
            {
              name: "propref",
              title: "Komponent referanse",
              type: "reference",
              to: [{ type: "ds_props" }],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Props",
        media: UlistIcon,
      };
    },
  },
});
