import { defineField, defineType } from "sanity";
import { allArticleDocsRef } from "../../config";
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
    defineField({
      title: "Blokker",
      name: "blocks",
      type: "array",
      of: [
        defineField({
          title: "Nytt fra Aksel",
          name: "nytt_fra_aksel",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              title: "Fremhevet artikkler",
              name: "highlights",
              type: "array",
              validation: (Rule) => Rule.max(2).required(),
              of: [
                defineField({
                  title: "Fremhevet artikkel",
                  name: "highlight",
                  type: "reference",
                  hidden: ({ value }) => !value,
                  to: [...allArticleDocsRef],
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          preview: {
            prepare() {
              return { title: "Nytt fra Aksel" };
            },
          },
        }),
      ],
    }),
    SEOFields,
  ],
  preview: {
    prepare() {
      return { title: "Forside Aksel" };
    },
  },
});
