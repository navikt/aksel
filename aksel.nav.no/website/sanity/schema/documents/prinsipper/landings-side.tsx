import { defineField, defineType } from "sanity";
/* import { komponentKategorier } from "../../../config"; */

export const PrinsipperLandingSide = defineType({
  title: "Landingsside Prinsipper",
  name: "prinsipper_landingsside",
  type: "document",
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
  ],
});
