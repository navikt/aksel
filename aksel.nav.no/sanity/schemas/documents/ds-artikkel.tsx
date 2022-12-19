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
