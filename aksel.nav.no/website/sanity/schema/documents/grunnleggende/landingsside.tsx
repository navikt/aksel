import { HouseIcon } from "@navikt/aksel-icons";
import { defineField, defineType } from "sanity";
import { grunnleggendeKategorier } from "../../../config";
import SanityTabGroups from "../presets/groups";
import BaseSEOPreset from "../presets/seo";

const views = () => {
  const list = [];
  grunnleggendeKategorier.forEach((kat) => {
    list.push(
      defineField({
        title: `Ingress ${kat.title}`,
        name: `ingress_${kat.value}`,
        type: "text",
        rows: 2,
      })
    );
    list.push(
      defineField({
        title: `Intro ${kat.title}`,
        name: `intro_${kat.value}`,
        type: "riktekst_standard",
      })
    );
  });
  return list;
};

export const GrunnleggendeLandingSide = defineType({
  title: "Landingsside Grunnleggende",
  name: "grunnleggende_landingsside",
  type: "document",
  groups: SanityTabGroups,
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "text",
    }),
    ...views(),
    BaseSEOPreset,
  ],
  preview: {
    prepare: () => ({
      title: "Landingsside grunnleggende",
      media: HouseIcon,
    }),
  },
});
