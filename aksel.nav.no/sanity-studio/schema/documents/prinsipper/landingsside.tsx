import { defineField, defineType } from "sanity";
import { HouseIcon } from "@navikt/aksel-icons";

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
      media: () => <HouseIcon aria-hidden />,
    }),
  },
});
