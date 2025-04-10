import { defineField, defineType } from "sanity";
import { HouseIcon } from "@navikt/aksel-icons";
import { grunnleggendeKategorier } from "../../../config";
import SanityTabGroups from "../presets/groups";
import BaseSEOPreset from "../presets/seo";

const views = () => {
  const list: ReturnType<typeof defineField>[] = [];
  grunnleggendeKategorier.forEach((kat) => {
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
    {
      title: "Oversikt-sider",
      name: "overview_pages",
      description:
        "Legger til en ny side 'Oversikt' i menyen som lister ut alle artiklene i kategorien.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: grunnleggendeKategorier.map((kat) => ({
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
      title: "Landingsside grunnleggende",
      media: () => <HouseIcon aria-hidden />,
    }),
  },
});
