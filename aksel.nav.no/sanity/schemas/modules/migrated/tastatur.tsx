import React from "react";

export default {
  title: "Tastatur",
  name: "tastatur_modul",
  type: "object",
  icon: () => <div>KBD</div>,
  fields: [
    {
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
    },
  ],
};
