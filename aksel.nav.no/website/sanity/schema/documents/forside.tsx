import { defineField, defineType } from "sanity";
import { groups } from "./presets";
import { SEOFields } from "./presets/seo";

export const Forside = defineType({
  title: "Forside Aksel",
  name: "aksel_forside",
  type: "document",
  groups,
  fields: [
    defineField({
      title: "God praksis intro",
      name: "god_praksis_intro",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    SEOFields,
  ],
});
