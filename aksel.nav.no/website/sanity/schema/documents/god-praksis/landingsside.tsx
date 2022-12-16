import { defineField, defineType } from "sanity";
import { SEOFields } from "../presets/seo";
import { groups } from "../presets/groups";
import { HomeIcon } from "@sanity/icons";

export const GodPraksisLandingSide = defineType({
  title: "Landingsside Grunnleggende",
  name: "godpraksis_landingsside",
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
      title: "Landingsside God-praksis",
      media: HomeIcon,
    }),
  },
});
