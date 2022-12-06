import { defineField, defineType } from "sanity";
import { komponentKategorier } from "../../../config";

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
  name: "komponent_landingsside",
  type: "document",
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "text",
    }),
    ...views(),
  ],
  preview: {
    prepare: () => ({
      title: "Landingsside komponenter",
    }),
  },
});
