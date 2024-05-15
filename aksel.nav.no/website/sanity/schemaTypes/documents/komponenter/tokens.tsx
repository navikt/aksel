import { defineField, defineType } from "sanity";

export const Tokens = defineType({
  title: "Tokengrupper designsystemet",
  name: "token_kategori",
  type: "document",
  fields: [
    defineField({
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
  __experimental_omnisearch_visibility: false,
});
