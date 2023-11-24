import { SANITY_API_VERSION } from "@/sanity/config";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "gp.artikkel",
  title: "Artikkel",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      validation: (Rule) => Rule.required(),
      type: "array",
      of: [
        defineArrayMember({
          title: "Undertema",
          type: "reference",
          to: [{ type: "gp.tema.undertema" }],
          options: {
            disableNew: true,
            filter: async ({ getClient, parent }) => {
              const tags = (
                parent as {
                  _key: string;
                  _ref?: string;
                  _type: "reference";
                }[]
              )
                .filter((x) => !!x._ref)
                .map((x) => x._ref);
              const client = getClient({ apiVersion: SANITY_API_VERSION });
              const temaIds = await client.fetch("*[_id in $ids].tema._ref", {
                ids: tags,
              });
              return {
                filter: "!(tema._ref in $temaIds)",
                params: { temaIds },
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "innholdstype",
      title: "Innholdstype",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "gp.innholdstype" }],
      options: {
        disableNew: true,
      },
    }),
  ],
  orderings: [
    {
      title: "Tittel",
      name: "title",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
