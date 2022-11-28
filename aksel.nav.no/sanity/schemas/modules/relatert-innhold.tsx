// MIGRERT

import { allDocumentTypes } from "../../config";
import { Link } from "@navikt/ds-icons";
import React from "react";

export default {
  name: "relatert_innhold",
  title: "Relatert Innhold",
  type: "object",
  icon: Link,
  fields: [
    {
      title: "Lenker til innhold",
      name: "lenker",
      type: "array",
      validation: (Rule) =>
        Rule.required().max(4).error("Kan ha maks 4 relaterte lenker"),
      of: [
        {
          title: "Lenke",
          name: "lenke",
          type: "object",
          fields: [
            {
              title: "Tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required()
                  .max(40)
                  .error("Tittelen kan være på maks 35 tegn"),
            },
            {
              title: "Intern side i Sanity",
              name: "intern",
              type: "boolean",
              option: {
                layout: "checkbox",
              },
              validation: (Rule) => Rule.required(),
              initialValue: false,
            },
            {
              title: "Lenke til Intern sanity-side",
              name: "intern_lenke",
              type: "reference",
              to: [...allDocumentTypes.map((x) => ({ type: x }))],
              hidden: ({ parent }) => !parent?.intern,
            },
            {
              title: "Lenke til ekstern side",
              name: "ekstern_link",
              type: "url",
              hidden: ({ parent }) => parent?.intern,
            },
            {
              title: "Linker til et eksternt domene",
              description:
                "Sett denne hvis lenken går til en side utenfor aksel.nav.no",
              name: "ekstern_domene",
              type: "boolean",
              initialValue: false,
              hidden: ({ parent }) => parent?.intern,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      links: "links",
    },
    prepare(s) {
      return { title: "Relatert innhold kort", media: () => <Link /> };
    },
  },
};
