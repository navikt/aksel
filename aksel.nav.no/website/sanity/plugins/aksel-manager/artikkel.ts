import { defineArrayMember, defineField, defineType } from "sanity";

export default function artikkel() {
  return defineType({
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
            title: "Tema tag",
            type: "reference",
            to: [{ type: "gp.tema.tag" }],
            options: {
              disableNew: true,
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
}
