import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { artikkelPreview } from "../presets/artikkel-preview";
import { grunnleggendeKategorier } from "../../../config";

const views = grunnleggendeKategorier.map((kat) =>
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

export const GrunnleggendeLandingSide = defineType({
  title: "Landingsside Grunnleggende",
  name: "grunnleggende_landingsside",
  type: "document",
  groups,
  ...artikkelPreview,
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "riktekst_standard",
    }),
    ...views,
  ],
});
