import {
  defaultDocPreview,
  editorField,
  groups,
  innholdFieldNew,
  kategoriSlug,
  publishedAtField,
  titleField,
} from "@/lib";

const prefix = "komponenter/";

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
    kategoriSlug(prefix),
    {
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Core", value: "core" },
          { title: "Internal", value: "internal" },
        ].map((x) => ({
          title: x.title,
          value: x.value,
        })),
        layout: "radio",
      },
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
          title: "Thumbnail",
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
