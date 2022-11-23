import { List } from "@navikt/ds-icons";
import React from "react";
import { defineType, defineField } from "sanity";

export const PropsSeksjon = defineType({
  title: "Props",
  name: "props_seksjon",
  type: "object",
  icon: List,
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
        {
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
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Props",
        media: () => <List />,
      };
    },
  },
});
