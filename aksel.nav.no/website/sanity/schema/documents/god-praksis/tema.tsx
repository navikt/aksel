import { defineField, defineType } from "sanity";
import { TemaPreview } from "../../custom-components/TemaPreview";
import { TemaView } from "../../custom-components/TemaView";
import SanityTabGroups from "../presets/groups";
import BaseSEOPreset from "../presets/seo";

export const Tema = defineType({
  title: "Aksel Tema",
  name: "aksel_tema",
  type: "document",
  groups: SanityTabGroups,
  components: {
    preview: TemaPreview,
    item: TemaPreview,
  },
  fields: [
    defineField({
      title: "Navn",
      name: "title",
      type: "string",
      group: "innhold",
      validation: (Rule) => Rule.required().error("Temaet må ha et navn"),
    }),
    defineField({
      title: "Kort Intro/Oppsummering",
      description: "Brukes i kort og innganger",
      name: "oppsummering",
      type: "string",
      group: "innhold",

      options: {
        // @ts-expect-error
        maxLength: 130,
      },
      validation: (Rule) =>
        Rule.required()
          .max(130)
          .error("Temaet burde ha en kort oppsummering/intro på max 65tegn"),
    }),
    defineField({
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst_enkel",
      group: "innhold",
    }),
    defineField({
      title: "Shortname",
      description: "En mer sanitert visning av tema-navnet i url ene",
      name: "slug",
      type: "slug",
      group: "innhold",
      validation: (Rule) => Rule.required().error("Tema må ha en URL"),
      options: {
        source: "title",
        slugify: (s: string) =>
          s
            ? s
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/-+/gm, "-")
                .replace(/æ/g, "a")
                .replace(/å/g, "a")
                .replace(/ø/g, "o")
                .replace(/[&\\#!,+()$~%.'"¨:*?<>{}]/g, "")
            : "",
      },
    }),
    defineField({
      title: "Ansvarlig for tema",
      description: "Legg til redaktør som har forvaltningsansvaret for temaet",
      name: "ansvarlig",
      type: "reference",
      to: [{ type: "editor" }],
      group: "innhold",
    }),
    defineField({
      title: "Seksjonering",
      description:
        "Del inn artiklene i flere seksjoner (vises ikke i preview før publisering desverre)",
      name: "seksjoner",
      type: "array",
      group: "innhold",
      of: [
        {
          type: "object",
          title: "Seksjon",
          name: "seksjon",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Tittel",
              validation: (Rule) =>
                Rule.required().error("Seksjonen må ha et navn"),
            },
            {
              title: "Beskrivelse",
              name: "beskrivelse",
              type: "riktekst_enkel",
            },
            {
              name: "sider",
              type: "array",
              title: "Sider",
              of: [
                {
                  type: "reference",
                  name: "ref",
                  title: "Side",
                  validation: (Rule) =>
                    Rule.required().error("Seksjonen må ha minst en referanse"),
                  to: [{ type: "aksel_artikkel" }],
                  options: {
                    filter: ({ document, parent }: any) => {
                      const selected = parent
                        .filter((x) => !!x._ref)
                        .map((x) => x._ref);
                      return {
                        filter: "references($refId) && !(_id in $docIds)",
                        params: {
                          refId: document._id.replace("drafts.", ""),
                          docIds: selected,
                        },
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      title: "Sider uten seksjon",
      name: "uten_seksjon",
      type: "string",
      group: "innhold",
      components: {
        field: TemaView,
      },
    }),
    defineField({
      title: "Pictogram",
      name: "pictogram",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Attribution",
          hidden: true,
          initialValue: "Tema-illustrasjon",
        },
      ],
      validation: (Rule) => Rule.required().error("Tema må ha pictogram"),
    }),
    BaseSEOPreset,
  ],
});
