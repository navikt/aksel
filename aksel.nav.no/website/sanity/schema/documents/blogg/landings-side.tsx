import { defineField, defineType } from "sanity";
/* import { bloggKategorier } from "../../../config"; */

export const BloggLandingSide = defineType({
  title: "Landingsside Blogg",
  name: "blogg_landingsside",
  type: "document",
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
  ],
});
