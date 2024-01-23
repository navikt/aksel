import { defineField, defineType } from "sanity";
import { HouseIcon } from "@navikt/aksel-icons";
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
      media: HouseIcon,
    }),
  },
});
