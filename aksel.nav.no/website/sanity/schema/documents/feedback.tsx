import { defineField, defineType } from "sanity";

export const Feedback = defineType({
  title: "Feedback",
  name: "aksel_feedback",
  type: "document",
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      readOnly: true,
    }),
    defineField({
      title: "Melding",
      name: "melding",
      type: "text",
      readOnly: true,
    }),
  ],
});
