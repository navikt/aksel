import { defineField, defineType } from "sanity";
import { WorkspaceT } from "../../util";
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

export const godPraksisArtikkel = (workspace: WorkspaceT) =>
  defineType({
    title: "God praksis artikkel",
    name: "aksel_artikkel",
    type: "document",
    groups:
      workspace !== "staging"
        ? [
            ...SanityTabGroups,
            { name: "staging", title: "God-praksis staging" },
          ]
        : [
            ...SanityTabGroups.map((x) => ({ ...x, default: false })),
            {
              name: "staging",
              title: "God-praksis staging",
              default: true,
            },
          ],
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
      defineField({
        name: "undertema",
        title: "Undertema",
        validation: (Rule) => Rule.required(),
        type: "reference",
        to: [{ type: "gp.tema.undertema" }],
        options: {
          disableNew: true,
        },
        /* TODO: Remove after God-praksis update */
        hidden: () => workspace !== "staging",
        group: "staging",
      }),
    ],
  });
