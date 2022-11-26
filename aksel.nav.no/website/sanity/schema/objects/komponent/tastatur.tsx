import React from "react";
import { defineField, defineType } from "sanity";

export const TastaturUU = defineType({
  title: "Tastatur",
  name: "tastatur_modul",
  type: "object",
  icon: () => <div>KBD</div>,
  fields: [
    defineField({
      type: "array",
      name: "tastatur",
      title: "Tastatur key + action",
      of: [
        {
          type: "object",
          name: "keys",
          fields: [
            { type: "string", name: "key" },
            { type: "string", name: "action" },
          ],
          validation: (Rule) => Rule.required(),
          options: {
            columns: "2",
          },
        },
      ],
    }),
  ],
});
