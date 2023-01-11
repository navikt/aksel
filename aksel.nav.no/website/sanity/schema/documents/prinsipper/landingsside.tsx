import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
  preview: {
    prepare: () => ({
      title: "Landingsside prinsipper",
      media: HomeIcon,
    }),
  },
});
