import { defineField, defineType } from "sanity";
import { komponentKategorier } from "../../../config";

const views = komponentKategorier.map((kat) =>
  defineField({
    type: "object",
    name: `fields_${kat}`,
    title: kat,
    fields: [
      defineField({
        title: "Tittel",
        name: `title`,
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        title: `Intro ${kat}`,
        name: `intro`,
        type: "riktekst_standard",
      }),
    ],
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
