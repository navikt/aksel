import { defineField, defineType } from "sanity";
import { komponentKategorier } from "../../../config";
import { showForDevsOnly } from "../../../util";
import { artikkelPreview } from "../presets/artikkel-preview";
import { editorField } from "../presets/editors";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { oppdateringsvarsel } from "../presets/oppdateringsvarsel";
import BaseSEOPreset from "../presets/seo";
import { kategoriSlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

const prefix = "komponenter/";

export const KomponentArtikkel = defineType({
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups: SanityTabGroups,
  ...artikkelPreview("Komponenter", 6),
  fields: [
    oppdateringsvarsel,
    ...hiddenFields,
    titleField,

    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          ...komponentKategorier.map((x) => ({
            title: x.title,
            value: x.value,
          })),
          { title: "Frittstående", value: "standalone" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Sidebar index",
      description:
        "Overstyrer sortering av artikler i sidebar. Hvis feltet er tomt, sorteres den alfabetisk.",
      name: "sidebarindex",
      type: "number",
      group: "settings",
    }),
    kategoriSlug(prefix),
    editorField,
    defineField({
      title: "Metadata",
      name: "status",
      group: "innhold",
      type: "object",
      fields: [
        {
          title: "Status",
          name: "tag",
          type: "string",
          initialValue: "new",
          options: {
            list: [
              { title: "Beta", value: "beta" },
              { title: "New", value: "new" },
              { title: "Stable", value: "ready" },
              { title: "Legacy", value: "deprecated" },
            ],
            layout: "radio",
          },
          validation: (Rule) => Rule.required(),
        },
        defineField({
          name: "unsafe",
          title: "Unsafe",
          description: "Er komponenten Beta + UNSAFE-prefikset?",
          type: "boolean",
          hidden: ({ parent }) => !(parent?.tag === "beta"),
        }),
        defineField({
          name: "internal",
          title: "Interne flater",
          description: "Er komponenten ment for bruk på interne flater?",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "bilde",
          title: "Thumbnail",
          type: "image",
        }),
      ],
    }),

    defineField({
      title: "Ikke vis 'Send innspill'-modul på siden",
      name: "hide_feedback",
      type: "boolean",
      initialValue: false,
      group: "settings",
      hidden: showForDevsOnly(),
    }),
    defineField({
      name: "intro",
      type: "intro_komponent",
      group: "innhold",
    }),
    defineField({
      title: "Innhold",
      description:
        "Innholdet i artikkelen er riktekst. Tips: klikk på ikon i høyre hjørne for å skrive i fullskjerm.",
      name: "content",
      group: "innhold",
      type: "riktekst_komponent",
    }),
    defineField({
      title: "Kodepakker",
      name: "kodepakker",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "ds-react", value: "ds-react" },
          { title: "ds-css", value: "ds-css" },
          { title: "ds-tokens", value: "ds-tokens" },
          { title: "ds-tailwind", value: "ds-tailwind" },
        ],
      },
    }),
    defineField({
      title: "Figma lenke (optional)",
      name: "figma_link",
      type: "url",
      group: "lenker",
    }),
    BaseSEOPreset,
  ],
  orderings: [
    {
      title: "Sist godkjent",
      name: "lastVerified",
      by: [{ field: "updateInfo.lastVerified", direction: "asc" }],
    },
  ],
});
