import { defineField, defineType } from "sanity";
/* import { bloggKategorier } from "../../../config"; */
import { SEOFields } from "../presets/seo";
import { groups } from "../presets/groups";

export const BloggLandingSide = defineType({
  title: "Landingsside Blogg",
  name: "blogg_landingsside",
  type: "document",
  groups,
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
    SEOFields,
  ],
  preview: {
    prepare: () => ({
      title: "Landingsside produktbloggen",
    }),
  },
});
