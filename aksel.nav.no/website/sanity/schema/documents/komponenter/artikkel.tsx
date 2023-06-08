import { defineField, defineType } from "sanity";
import { komponentKategorier } from "../../../config";
import { artikkelPreview } from "../presets/artikkel-preview";
import { oppdateringsvarsel } from "../presets/oppdateringsvarsel";
import { editorField } from "../presets/editors";
import { groups } from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { SEOFields } from "../presets/seo";
import { kategoriSlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

const prefix = "komponenter/";

export const KomponentArtikkel = defineType({
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups,
  ...artikkelPreview("Komponenter"),
  fields: [
    oppdateringsvarsel,
    ...hiddenFields,
    titleField,
    editorField,
    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: komponentKategorier.map((x) => ({
          title: x.title,
          value: x.value,
        })),
        layout: "radio",
      },
    }),
    kategoriSlug(prefix),

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
              { title: "Deprecated", value: "deprecated" },
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
      options: {
        collapsible: true,
        collapsed: false,
      },
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
          { title: "ds-react-internal", value: "ds-react-internal" },
          { title: "ds-css-internal", value: "ds-css-internal" },
          { title: "ds-icons", value: "ds-icons" },
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
    SEOFields,
  ],
});
