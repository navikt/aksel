import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "gp.tema",
  title: "Tema",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      validation: (Rule) => Rule.unique(),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "gp.tema.undertema" }],
          options: {
            disableNew: true,
            filter: async ({ parent, document }) => {
              const tags = (
                parent as {
                  _key: string;
                  _ref?: string;
                  _type: "reference";
                }[]
              )
                .filter((x) => !!x._ref)
                .map((x) => x._ref);

              return {
                filter: "!(_id in $tags) && tema._ref in $id",
                params: {
                  id: [document._id, document._id.replace("drafts.", "")],
                  tags,
                },
              };
            },
          },
        }),
      ],
      options: {
        sortable: true,
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
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
