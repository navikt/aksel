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

const prefix = "god-praksis/artikler/";

export const GodPraksisArtikkel = defineType({
  title: "Aksel Artikkel",
  name: "aksel_artikkel",
  type: "document",
  groups,
  ...artikkelPreview,
  fields: [
    ...hiddenFields,
    titleField,
    editorField,
    sanitySlug(prefix, 3),
    defineField({
      title: "Kobling til tema",
      description:
        "Gjør det mulig for temaredaktør å vise artikkelen på en temaside",
      name: "tema",
      type: "array",
      of: [{ type: "reference", to: [{ type: "aksel_tema" }] }],
      group: "innhold",
    }),
    ingressField,
    defineField({
      title: "Innhold",
      description:
        "Innholdet i artikkelen er riktekst. Tips: klikk på ikon i høyre hjørne for å skrive i fullskjerm.",
      name: "content",
      type: "riktekst_standard",
      group: "innhold",
    }),
    relevanteArtiklerField,
    SEOFields,
  ],
});
