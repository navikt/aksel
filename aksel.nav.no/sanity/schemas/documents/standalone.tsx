import {
  defaultDocPreview,
  groups,
  innholdFieldNew,
  migratedField,
  publishedAtField,
  sanitySlug,
  titleField,
} from "@/lib";

const prefix = "side/";

export default {
  title: "Standalone-sider",
  name: "aksel_standalone",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    titleField,
    sanitySlug(prefix, 2),
    innholdFieldNew,
    migratedField,
  ],
};
