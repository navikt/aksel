import { defineField, defineType } from "sanity";
import { groups } from "../presets/groups";
import { artikkelPreview } from "../presets/artikkel-preview";
import { hiddenFields } from "../presets/hidden-fields";
import { editorField } from "../presets/editors";
import { titleField } from "../presets/title-field";
import { ingressField } from "../presets/ingress";
import { SEOFields } from "../presets/seo";
import { relevanteArtiklerField } from "../presets/relevante-artikler";
import { sanitySlug } from "../presets/slug";

const prefix = "artikkel/";

export const GodPraksisArtikkel = defineType({
  title: "Aksel Artikkel",
  name: "aksel_artikkel",
  type: "document",
  groups,
  ...artikkelPreview,
  fields: [
    ...hiddenFields,
    editorField,
    titleField,
    sanitySlug(prefix, 2),
    defineField({
      title: "Tema",
      description: "Legg til de viktigeste temaene",
      name: "tema",
      type: "array",
      of: [{ type: "reference", to: [{ type: "aksel_tema" }] }],
      group: "innhold",
    }),

    ingressField,
    defineField({
      title: "Innhold",
      name: "content",
      type: "riktekst_aksel",
      group: "innhold",
    }),
    relevanteArtiklerField,

    SEOFields,
  ],
});
