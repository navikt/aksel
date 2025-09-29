import { defineArrayMember, defineField, defineType } from "sanity";
import { SANITY_API_VERSION } from "@/sanity/config";
import { InnholdstypeHighlight } from "../../custom-components/gp/InnholdstypeHighlight";
import { UndertemaHighlight } from "../../custom-components/gp/UndertemaHighlight";
import { artikkelPreview } from "../presets/artikkel-preview";
import { writersField } from "../presets/editors";
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
    defineField({
      name: "innholdstype",
      title: "Innholdstype",
      type: "reference",
      to: [{ type: "gp.innholdstype" }],
      components: {
        field: InnholdstypeHighlight,
      },
      options: {
        disableNew: true,
      },
      group: "innhold",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "undertema",
      title: "Undertema",
      type: "array",
      group: "innhold",
      validation: (Rule) => Rule.required(),
      components: {
        field: UndertemaHighlight,
      },
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
    writersField,
    sanitySlug(prefix, 3),
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
