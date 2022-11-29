import { defineField, defineType } from "sanity";

export const GodPraksisLandingSide = defineType({
  title: "Landingsside Grunnleggende",
  name: "godpraksis_landingsside",
  type: "document",
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
  ],
});
