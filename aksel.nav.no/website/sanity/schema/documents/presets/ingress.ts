import { defineField } from "sanity";

export const ingressField = defineField({
  title: "Ingress",
  name: "ingress",
  description:
    "Brukes til ingress, card description og seo description-tag. Bør bære konsis og oppsummerende.",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) =>
    Rule.required().max(210).error("Ingressen kan ikke være over 210 tegn"),
  options: {
    //@ts-ignore
    maxLength: 210,
  },
});
