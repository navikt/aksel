import { defineField } from "sanity";

export const ingressField = defineField({
  title: "Ingress",
  name: "ingress",
  description: "Side, innganger og seo description-tag",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) =>
    Rule.required().max(210).error("Ingress kan ikke være på over 210 tegn"),
});
