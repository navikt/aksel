import { groups } from "./presets";
import { defineField, defineType } from "sanity";
import { allArticleDocsRef } from "../../config";
import { SEOFields } from "./presets/seo";

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
      title: "'Kom i gang'-lenker",
      name: "komigang",
      type: "array",
      validation: (Rule) => Rule.required().min(2).max(3),
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            {
              type: "string",
              name: "title",
              validation: (Rule) => Rule.required().max(50),
            },
            {
              title: "Reference",
              name: "reference",
              type: "reference",
              to: allArticleDocsRef,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
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
      of: [
        {
          type: "object",
          name: "temalink",
          fields: [
            {
              name: "ref",
              type: "reference",
              to: [{ type: "aksel_tema" }],
              validation: (Rule) => Rule.required(),
            },
            {
              type: "text",
              name: "intro",
              validation: (Rule) => Rule.required().max(210),
              options: {
                //@ts-ignore
                maxLength: 210,
              },
            },
          ],
        },
      ],
    }),
    SEOFields,
  ],
});
