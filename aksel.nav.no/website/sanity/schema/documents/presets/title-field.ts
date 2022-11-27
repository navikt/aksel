import { defineField } from "sanity";

/* TODO: Max-char counter */
export const titleField = defineField({
  title: "Sidetittel",
  name: "heading",
  type: "string",
  group: "innhold",
  description:
    "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
  validation: (Rule) =>
    Rule.required()
      .max(60)
      .error("Siden bør ha en kort og konsis heading (<h1>)"),
});
