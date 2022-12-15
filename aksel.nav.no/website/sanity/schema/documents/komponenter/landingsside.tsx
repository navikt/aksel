import { defineField, defineType } from "sanity";
import { komponentKategorier } from "../../../config";
import { SEOFields } from "../presets/seo";
import { groups } from "../presets/groups";

const views = () => {
  const list = [];
  komponentKategorier.forEach((kat) => {
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

export const KomponentLandingSide = defineType({
  title: "Landingsside Komponenter",
  name: "komponenter_landingsside",
  type: "document",
  groups,
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "text",
    }),
    ...views(),
    SEOFields,
  ],
  preview: {
    prepare: () => ({
      title: "Landingsside komponenter",
    }),
  },
});
