import { defineField, defineType } from "sanity";
import { HouseIcon } from "@navikt/aksel-icons";
import { templatesKategorier } from "../../../config";
import SanityTabGroups from "../presets/groups";
import BaseSEOPreset from "../presets/seo";

const views = () => {
  const list: ReturnType<typeof defineField>[] = [];
  templatesKategorier.forEach((kat) => {
    list.push(
      defineField({
        title: `Ingress ${kat.title}`,
        description: "Støtter markdown-lenker",
        name: `ingress_${kat.value}`,
        type: "text",
        rows: 2,
      }),
    );
    list.push(
      defineField({
        title: `Intro ${kat.title}`,
        name: `intro_${kat.value}`,
        type: "riktekst_standard",
      }),
    );
    list.push(
      defineField({
        title: `Legg til siden 'oversikt' for ${kat.title}?`,
        description:
          "Legger til en ny side 'Oversikt' i menyen som lister ut alle artiklene i kategorien.",
        name: `show_overview_${kat.value}`,
        type: "boolean",
      }),
    );
  });
  return list;
};

export const TemplatesLandingSide = defineType({
  title: "Landingsside Mønster og Maler",
  name: "templates_landingsside",
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
      title: "Landingsside Mønster og Maler",
      media: () => <HouseIcon aria-hidden />,
    }),
  },
});
