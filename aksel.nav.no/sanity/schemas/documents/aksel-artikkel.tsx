import {
  defaultDocPreview,
  editorField,
  groups,
  ingressField,
  innholdFieldNew,
  migratedField,
  publishedAtField,
  relevanteArtiklerField,
  sanitySlug,
  SEOFields,
  titleField,
} from "@/lib";

const prefixOld = "artikkel/";
const prefix = "god-praksis/artikler/";

export default {
  title: "Aksel Artikkel",
  name: "aksel_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    sanitySlug(prefixOld, 2),
    {
      ...sanitySlug(prefix, 3),
      name: "slug_v2",
      title: "Url v2",
      hidden: ({ currentUser }) =>
        !currentUser.roles.find((x) => x.name === "developer"),
      validation: () => null,
    },
    {
      title: "Tema",
      description: "Legg til de viktigeste temaene",
      name: "tema",
      type: "array",
      of: [{ type: "reference", to: [{ type: "aksel_tema" }] }],
      group: "innhold",
    },

    ingressField,
    innholdFieldNew,
    relevanteArtiklerField,

    SEOFields,
    migratedField,
  ],
};
