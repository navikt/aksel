import {
  defaultDocPreview,
  editorField,
  groups,
  innholdFieldNew,
  kategoriSlug,
  publishedAtField,
  titleField,
} from "@/lib";

const prefix = "grunnleggende/";

export default {
  title: "Artikkel",
  name: "ds_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    {
      title: "Sist godkjent",
      name: "updateInfo",
      type: "object",
      hidden: true,
      fields: [
        {
          type: "date",
          name: "lastVerified",
          title: "Sist oppdatert",
          description: "Kun synlig for utviklere",
          readOnly: true,
        },
      ],
    },
    publishedAtField,
    editorField,
    titleField,
    kategoriSlug(prefix),
    { title: "url", name: "slug", type: "slug", hidden: true },
    {
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Styling", value: "styling" },
          { title: "Tokens", value: "tokens" },
          { title: "Stæsj", value: "staesj" },
          { title: "Guider", value: "guider" },
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
      ...innholdFieldNew,
      type: "riktekst_ds_artikkel",
    },
  ],
};
