import {
  defaultDocPreview,
  editorField,
  groups,
  innholdFieldNew,
  publishedAtField,
  sanitySlug,
  titleField,
} from "@/lib";

const prefix = "designsystem/komponenter/";

export default {
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    sanitySlug(prefix, 3),
    {
      title: "url (v2)",
      name: "slug_v2",
      type: "slug",
      hidden: ({ currentUser }) =>
        !currentUser.roles.find((x) => x.name === "developer"),
    },
    {
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
    },
    {
      name: "intro",
      type: "intro_komponent",
      group: "innhold",
    },
    {
      ...innholdFieldNew,
      type: "riktekst_komponent",
      name: "content",
      title: "Innhold",
    },
    {
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
    },
    {
      title: "Figma lenke (optional)",
      name: "figma_link",
      type: "url",
      group: "lenker",
    },
  ],
};
