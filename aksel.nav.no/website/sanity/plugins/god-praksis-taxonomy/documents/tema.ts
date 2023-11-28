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
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst_enkel",
    }),
    defineField({
      name: "undertema",
      title: "Undertema",
      type: "array",
      validation: (Rule) => Rule.unique(),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "gp.tema.undertema" }],
          options: {
            disableNew: true,
            filter: async ({ parent, document }) => {
              const undertema = (
                parent as {
                  _key: string;
                  _ref?: string;
                  _type: "reference";
                }[]
              )
                .filter((x) => !!x._ref)
                .map((x) => x._ref);

              return {
                filter: "!(_id in $undertema) && tema._ref in $id",
                params: {
                  id: [document._id, document._id.replace("drafts.", "")],
                  undertema,
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
