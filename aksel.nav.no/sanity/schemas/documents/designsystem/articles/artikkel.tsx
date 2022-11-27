import {
  defaultDocPreview,
  editorField,
  groups,
  hidePageFeedback,
  innholdFieldNew,
  innholdFieldNewNested,
  migratedField,
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
    migratedField,
    publishedAtField,
    editorField,
    titleField,
    sanitySlug(prefix, 3),
    {
      title: "Layout",
      description:
        "'Full' bruker hele bredden, men fjerner table of content (bruk bare for eks ikonside eller komponentvisning)",
      name: "layout",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "Default", value: "default" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    },
    {
      ...innholdFieldNew,
      type: "riktekst_ds_artikkel",
    },
    hidePageFeedback,
  ],
};
