import { defineField, defineType } from "sanity";
import { komponentKategorier } from "../../../config";

const views = komponentKategorier.map((kat) =>
  defineField({
    title: `Intro ${kat.title}`,
    name: `intro_${kat.value}`,
    type: "riktekst_standard",
  })
);

export const KomponentLandingSide = defineType({
  title: "Landingsside Komponenter",
  name: "komponent_landingsside",
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
