import { defineField, defineType } from "sanity";

export const Skrivehjelp = defineType({
  title: "Skrivehjelp",
  name: "skrivehjelp",
  type: "document",
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
