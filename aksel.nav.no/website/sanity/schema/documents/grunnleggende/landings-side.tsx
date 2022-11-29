import { defineField, defineType } from "sanity";
import { grunnleggendeKategorier } from "../../../config";

const views = grunnleggendeKategorier.map((kat) =>
  defineField({
    title: `Intro ${kat.title}`,
    name: `intro_${kat.value}`,
    type: "riktekst_standard",
  })
);

export const GrunnleggendeLandingSide = defineType({
  title: "Landingsside Grunnleggende",
  name: "grunnleggende_landingsside",
  type: "document",
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
    ...views,
  ],
});
