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
      ...innholdFieldNew,
      type: "riktekst_ds_artikkel",
    },
  ],
};
