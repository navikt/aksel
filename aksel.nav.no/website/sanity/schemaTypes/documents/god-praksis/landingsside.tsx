import { defineField, defineType } from "sanity";
import SanityTabGroups from "../presets/groups";
import BaseSEOPreset from "../presets/seo";

export const GodPraksisLandingSide = defineType({
  title: "Landingsside Grunnleggende",
  name: "godpraksis_landingsside",
  type: "document",
  groups: SanityTabGroups,
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
    BaseSEOPreset,
  ],
  preview: {
    prepare: () => ({
      title: "Landingsside God-praksis",
    }),
  },
});
