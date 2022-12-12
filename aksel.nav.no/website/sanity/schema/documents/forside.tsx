import { groups } from "./presets";
import { defineField, defineType } from "sanity";

export const Forside = defineType({
  title: "Forside Aksel",
  name: "aksel_forside",
  type: "document",
  groups,
  fields: [
    defineField({
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "God praksis intro",
      name: "god_praksis_intro",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Tema",
      description: "Tema som blir vist på forsiden",
      name: "tema",
      type: "array",
      validation: (Rule) => Rule.required().min(4),
      of: [{ type: "reference", to: [{ type: "aksel_tema" }] }],
    }),
    defineField({ type: "seo", title: "Seo", name: "seo" }),
  ],
});
