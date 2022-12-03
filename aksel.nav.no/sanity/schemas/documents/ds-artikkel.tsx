import {
  defaultDocPreview,
  editorField,
  groups,
  innholdFieldNew,
  publishedAtField,
  sanitySlug,
  titleField,
} from "@/lib";

const prefix = "designsystem/side/";

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
    sanitySlug(prefix, 3),
    {
      title: "url (v2)",
      name: "slug_v2",
      type: "slug",
      hidden: ({ currentUser }) =>
        !currentUser.roles.find((x) => x.name === "developer"),
    },
    {
      ...innholdFieldNew,
      type: "riktekst_ds_artikkel",
    },
  ],
};
