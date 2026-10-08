import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaConfig } from "../../schema.config";

export const NewsletterTodo = defineType({
  title: "Nyhetsbrev Todo",
  name: "newsletter_todo",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      title: "TODO",
      name: "todoList",
      type: "array",
      options: {
        sortable: false,
      },
      of: [
        defineArrayMember({
          type: "object",
          name: "inline",

          fields: [
            defineField({
              name: "articleRef",
              title: "Artikkel eller endringslogg",
              type: "reference",
              weak: true,
              to: [
                ...SchemaConfig.allArticleDocuments.map((type) => ({ type })),
                { type: "ds_endringslogg_artikkel" },
              ],
              description: "Which movie are we screening",
              options: {
                disableNew: true,
              },
              readOnly: true,
            }),
            defineField({ type: "date", name: "dateAdded", readOnly: true }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      todoList: "todoList",
    },
    prepare: ({ todoList }) => {
      return {
        title: "Nyhetsbrev TODO",
        subtitle: `Totalt: ${todoList?.length || 0}`,
      };
    },
  },
});
