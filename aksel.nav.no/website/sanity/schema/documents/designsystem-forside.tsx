import { defineField, defineType } from "sanity";
import SanityTabGroups from "./presets/groups";
import BaseSEOPreset from "./presets/seo";

export const DesignsystemForside = defineType({
  title: "Forside Designsystemet",
  name: "aksel_ds_forside",
  type: "document",
  groups: SanityTabGroups,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      title: "Tittel",
      name: "ds_forside_title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Aksel designsystemet",
    }),
    defineField({
      title: "Ingress",
      name: "ds_forside_ingress",
      type: "text",
      validation: (Rule) => Rule.required(),
      initialValue:
        "Aksel er designsystemet til Navs produktutvikling, en samling med designtokens, dokumenterte komponenter, maler og guider. En komplett plattform for å lage førsteklasses grensesnitt.",
    }),
    defineField({
      title: "Promotag",
      name: "ds_forside_promo_tag",
      type: "object",
      fields: [
        defineField({
          title: "Vis promo",
          name: "show",
          type: "boolean",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Label",
          name: "label",
          type: "string",
          validation: (Rule) => Rule.required(),
          initialValue: "Nyhet",
        }),
        defineField({
          title: "Tekst",
          name: "text",
          type: "string",
          validation: (Rule) => Rule.required(),
          initialValue: "Ny versjon av Aksel er ute 🎉",
        }),
        defineField({
          title: "Lenke",
          name: "link",
          type: "url",
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ["http", "https"],
              allowRelative: true,
            }),
          initialValue: "/designsystemet",
        }),
      ],
    }),
    defineField({
      title: "Start med...",
      name: "ds_getting_started",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineField({
          title: "Lenkekort",
          name: "link_card",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              title: "Tittel",
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Beskrivelse",
              name: "description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Ikon",
              name: "icon",
              type: "string",
              options: {
                list: ["Palette", "Code"],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Lenke",
              name: "link",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https"],
                  allowRelative: true,
                }),
            }),
          ],
        }),
      ],
      initialValue: [
        {
          title: "Start med design",
          description: "Figma-filer og kreative arenaer",
          icon: "Palette",
          link: "/grunnleggende/introduksjon/kom-i-gang-med-figma",
        },
        {
          title: "Start med utvikling",
          description: "Installasjon og tips",
          icon: "Code",
          link: "/grunnleggende/introduksjon/kom-i-gang-med-kodepakkene",
        },
      ],
    }),
    defineField({
      title: "Lagene i designsystemet",
      name: "ds_layers_overview",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          title: "Tittel",
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Ingress",
          name: "ingress",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
      ],
      initialValue: {
        title: "Et fleksibelt system",
        ingress:
          "Aksel designsystemet består av flere lag som kan brukes enkeltvis eller som en full pakke.",
      },
    }),
    defineField({
      title: "Endringslogg",
      name: "ds_changelog",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          title: "Tittel",
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Ingress",
          name: "ingress",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
      ],
      initialValue: {
        title: "Endringslogg",
        ingress: "Se siste endringer i kode.",
      },
    }),
    defineField({
      title: "Aksel i tall",
      name: "ds_aksel_in_numbers",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          title: "Tittel",
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
          initialValue: "Aksel i tall",
        }),
        defineField({
          title: "Ingress",
          name: "ingress",
          type: "text",
          validation: (Rule) => Rule.required(),
          initialValue: "Aktiv forvaltning og økende bruk.",
        }),
        defineField({
          title: "Tall",
          name: "statistics",
          type: "array",
          validation: (Rule) => Rule.required(),
          of: [
            defineField({
              title: "Satistikk",
              name: "statistic",
              type: "object",
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  title: "Tittel",
                  name: "title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                  initialValue: "Komponenter i bruk",
                }),
                defineField({
                  title: "Nummer",
                  name: "number",
                  type: "number",
                  validation: (Rule) => Rule.required(),
                  initialValue: 100,
                }),
                defineField({
                  title: "Enhet",
                  name: "unit",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                  initialValue: "k",
                }),
              ],
            }),
          ],
        }),
      ],
      initialValue: {
        title: "Aksel i tall",
        ingress: "Aktiv forvaltning og økende bruk.",
        statistics: [
          {
            number: 94,
            unit: "k",
            description: "Komponenter i prod",
          },
          {
            number: 600,
            unit: "+",
            description: "Løsninger bruker Aksel",
          },
          {
            number: 91.8,
            unit: "%",
            description: "Bruker siste versjoner",
          },
        ],
      },
    }),
    defineField({
      title: "Support",
      name: "ds_support",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineField({
          title: "Supportkort",
          name: "support_card",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              title: "Tittel",
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Beskrivelse",
              name: "description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Lenke",
              name: "link",
              type: "object",
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  title: "URL",
                  name: "url",
                  type: "url",
                  validation: (Rule) =>
                    Rule.required().uri({
                      scheme: ["http", "https"],
                    }),
                }),
                defineField({
                  title: "Tekst",
                  name: "text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  title: "Ikon",
                  name: "icon",
                  type: "string",
                  options: {
                    list: ["Github", "Slack"],
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
      initialValue: [
        {
          title: "Rapporter en bug",
          description:
            "Om du har funnet en bug eller noe som ikke henger på greip kan du gi oss beskjed på GitHub.",
          link: {
            url: "http://localhost:3000/dev/designsystemet#github",
            text: "Rapporter en bug",
            icon: "Github",
          },
        },
        {
          title: "Vi blir bedre sammen",
          description:
            "Bli med på Slack der alle hjelper hverandre med kode, design og gode råd.",
          link: {
            url: "http://localhost:3000/dev/designsystemet#slack",
            text: "Gå til kanalen",
            icon: "Slack",
          },
        },
      ],
    }),
    BaseSEOPreset,
  ],
  preview: {
    prepare() {
      return {
        title: "Forside Designsystemet",
      };
    },
  },
});
