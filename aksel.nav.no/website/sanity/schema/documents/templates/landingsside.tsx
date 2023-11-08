import { HouseIcon } from "@navikt/aksel-icons";
import { defineField, defineType } from "sanity";
import { templatesKategorier } from "../../../config";
import { groups } from "../presets/groups";
import { SEOFields } from "../presets/seo";

const views = () => {
  const list = [];
  templatesKategorier.forEach((kat) => {
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

export const TemplatesLandingSide = defineType({
  title: "Landingsside Mønster og Maler",
  name: "templates_landingsside",
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
      title: "Landingsside Mønster og Maler",
      media: HouseIcon,
    }),
  },
});
