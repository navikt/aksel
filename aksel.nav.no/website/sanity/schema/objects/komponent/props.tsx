import { defineField, defineType } from "sanity";
import { BulletListIcon } from "@navikt/aksel-icons";
import type { Props_seksjon } from "@/app/_sanity/query-types";

export const PropsSeksjon = defineType({
  title: "Props",
  name: "props_seksjon",
  type: "object",
  icon: () => <BulletListIcon aria-hidden />,
  fields: [
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
              title: "Komponentnavn",
              description: "Slik man ville brukt den, f.eks. Accordion.Item",
              type: "string",
              name: "title",
            },
            defineField({
              title: "Overstyr overskriftsnivå",
              name: "heading_level",
              type: "string",
              options: {
                list: ["3", "4"],
              },
            }),
            {
              title: "Komponenten bruker OverridableComponent API-et",
              type: "boolean",
              name: "overridable",
              initialValue: false,
            },
            {
              name: "propref",
              title: "Komponent-referanse",
              type: "reference",
              to: [{ type: "ds_props" }],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      komponenter: "komponenter",
    },
    prepare({ komponenter }) {
      return {
        title: "Props",
        subtitle: (komponenter as Props_seksjon["komponenter"])
          ?.map((k) =>
            k.heading_level ? `${k.title} (h${k.heading_level})` : k.title,
          )
          .join(", "),
        media: () => <BulletListIcon aria-hidden />,
      };
    },
  },
});
