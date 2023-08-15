import { defineField } from "sanity";

export const ingressField = defineField({
  title: "Ingress",
  name: "ingress",
  description:
    "Brukes til diverse metadata-felt. Bør bære konsis og oppsummere for hva artikkel innebærer.",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) =>
    Rule.required()
      .max(210)
      .error("Side må ha en ingress og kortere enn 210 tegn."),
  options: {
    //@ts-ignore
    maxLength: 210,
  },
});
