import { defineArrayMember, defineField, defineType } from "sanity";
import { SANITY_API_VERSION } from "@/sanity/config";
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
      defineField({
        name: "innholdstype",
        title: "Innholdstype",
        type: "reference",
        to: [{ type: "gp.innholdstype" }],
        options: {
          disableNew: true,
        },
        /* TODO: Remove after God-praksis update */
        hidden: () => workspace !== "staging",
        group: "staging",
        /* Add required after update */
        /* validation: (Rule) => Rule.required(), */
      }),
      defineField({
        name: "undertema",
        title: "Undertema",
        type: "array",
        /* TODO: Remove after God-praksis update */
        hidden: () => workspace !== "staging",
        group: "staging",
        /* Add required after update */
        /* validation: (Rule) => Rule.required(), */
        /*  */
        of: [
          defineArrayMember({
            title: "Undertema",
            type: "reference",
            to: [{ type: "gp.tema.undertema" }],
            options: {
              disableNew: true,
              filter: async ({ getClient, parent }) => {
                const undertema = (
                  parent as {
                    _key: string;
                    _ref?: string;
                    _type: "reference";
                  }[]
                )
                  .filter((x) => !!x._ref)
                  .map((x) => x._ref);

                const client = getClient({ apiVersion: SANITY_API_VERSION });
                const temaIds = await client.fetch("*[_id in $ids].tema._ref", {
                  ids: undertema,
                });
                return {
                  filter: "!(tema._ref in $temaIds)",
                  params: { temaIds },
                };
              },
            },
          }),
        ],
      }),
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
