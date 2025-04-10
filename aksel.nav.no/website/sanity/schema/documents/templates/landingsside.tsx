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
    {
      title: "Oversikt-sider",
      name: "overview_pages",
      description:
        "Legger til en ny side 'Oversikt' i menyen som lister ut alle artiklene i kategorien.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: templatesKategorier.map((kat) => ({
          title: kat.title,
          value: kat.value,
        })),
      },
    },
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
