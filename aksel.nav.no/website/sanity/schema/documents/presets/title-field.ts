import { defineField } from "sanity";

/* TODO: Max-char counter */
export const titleField = defineField({
  title: "Sidetittel",
  name: "heading",
  type: "string",
  group: "innhold",
  description: "Bruk en kort og konsis tittel om mulig.",

  validation: (Rule) => [
    Rule.required().min(3).error("Sidetittel må være på minst 3 tegn"),
    Rule.max(60).error("Sidetittel kan ikke være over 60 tegn"),
  ],
  options: {
    //@ts-ignore
    maxLength: 60,
  },
});
