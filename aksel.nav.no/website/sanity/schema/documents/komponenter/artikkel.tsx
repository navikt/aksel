import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { artikkelPreview } from "../presets/artikkel-preview";
import { hiddenFields } from "../presets/hidden-fields";
import { editorField } from "../presets/editors";
import { titleField } from "../presets/title-field";
import { sanitySlug } from "../presets/slug";

const prefix = "designsystem/komponenter/";

export const KomponentArtikkel = defineType({
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups,
  ...artikkelPreview,
  fields: [
    ...hiddenFields,
    editorField,
    titleField,
    sanitySlug(prefix, 3),

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
              { title: "Ready", value: "ready" },
              { title: "Deprecated", value: "deprecated" },
            ],
            layout: "radio",
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "bilde",
          title: "Thumbnail/og-bilde",
          type: "image",
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: "intro",
      type: "intro_komponent",
      group: "innhold",
    }),
    defineField({
      title: "Innhold",
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
  ],
});
