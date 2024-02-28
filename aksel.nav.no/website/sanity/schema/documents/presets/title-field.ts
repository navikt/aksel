import { defineField } from "sanity";

export const titleField = defineField({
  title: "Sidetittel",
  name: "heading",
  type: "string",
  group: "innhold",
  description: "Bruk en kort og konsis tittel",

  validation: (Rule) => [
    Rule.required().min(3).error("Sidetittel må være på minst 3 tegn"),
    Rule.max(60).error("Sidetittel kan ikke være over 60 tegn"),
  ],
  options: {
    //@ts-expect-error - maxLength is a custom prop not officially supported
    maxLength: 60,
  },
});
