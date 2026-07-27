import { defineField } from "sanity";

export const ingressField = defineField({
  title: "Ingress",
  name: "ingress",
  description:
    "Brukes til diverse metadata-felt. Bør bære konsis og oppsummere for hva artikkel innebærer.",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) => [
    Rule.required().min(10),
    Rule.max(210).warning("Ingress bør være kortere enn 210 tegn."),
  ],
});
