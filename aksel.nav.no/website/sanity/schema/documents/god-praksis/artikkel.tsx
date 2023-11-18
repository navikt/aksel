import { defineField, defineType } from "sanity";
import { artikkelPreview } from "../presets/artikkel-preview";
import { editorField } from "../presets/editors";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { ingressField } from "../presets/ingress";
import { oppdateringsvarsel } from "../presets/oppdateringsvarsel";
import { relevanteArtiklerField } from "../presets/relevante-artikler";
import BaseSEOPreset from "../presets/seo";
import { skrivehjelp } from "../presets/skrivehjelp";
import { sanitySlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

const prefix = "god-praksis/artikler/";

export const GodPraksisArtikkel = defineType({
  title: "God praksis artikkel",
  name: "aksel_artikkel",
  type: "document",
  groups: SanityTabGroups,
  ...artikkelPreview("God praksis"),
  fields: [
    oppdateringsvarsel,
    ...hiddenFields,
    titleField,
    editorField,
    sanitySlug(prefix, 3),
    defineField({
      title: "Kobling til tema",
      description:
        "Lenker artikkel til Tema og tilgjengeliggjør den for tema-redaktører.",
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
    BaseSEOPreset,
    skrivehjelp,
  ],
});
