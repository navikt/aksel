import { defineField, defineType } from "sanity";

export const Publiseringsflyt = defineType({
  title: "Publiseringsflyt",
  name: "publication_flow",
  type: "document",
  fields: [
    defineField({
      title: "BB",
      description: "Hello world",
      name: "content",
      type: "string",
    }),
  ],
});
