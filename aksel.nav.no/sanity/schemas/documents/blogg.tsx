import {
  defaultDocPreview,
  editorField,
  groups,
  ingressField,
  innholdFieldNew,
  publishedAtField,
  sanitySlug,
  SEOFields,
  titleField,
} from "@/lib";

const prefix = "produktbloggen/";

export default {
  title: "Blogg",
  name: "aksel_blogg",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    sanitySlug(prefix, 2),
    ingressField,
    innholdFieldNew,

    SEOFields,
  ],
};
