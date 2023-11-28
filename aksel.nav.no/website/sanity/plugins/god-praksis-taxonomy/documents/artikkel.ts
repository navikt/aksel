import { SANITY_API_VERSION } from "@/sanity/config";
import { defineArrayMember, defineField, defineType } from "sanity";
import SanityTabGroups from "../../../schema/documents/presets/groups";
import { hiddenFields } from "../../../schema/documents/presets/hidden-fields";
import { ingressField } from "../../../schema/documents/presets/ingress";
import { oppdateringsvarsel } from "../../../schema/documents/presets/oppdateringsvarsel";
import { relevanteArtiklerField } from "../../../schema/documents/presets/relevante-artikler";
import BaseSEOPreset from "../../../schema/documents/presets/seo";
import { skrivehjelp } from "../../../schema/documents/presets/skrivehjelp";
import { sanitySlug } from "../../../schema/documents/presets/slug";
import { titleField } from "../../../schema/documents/presets/title-field";

const prefix = "god-praksis/artikler/";

export default defineType({
  name: "gp.artikkel",
  title: "Artikkel",
  type: "document",
  groups: SanityTabGroups,

  fields: [
    oppdateringsvarsel,
    ...hiddenFields,
    titleField,
    sanitySlug(prefix, 3),
    defineField({
      name: "undertema",
      title: "Undertema",
      validation: (Rule) => Rule.required(),
      type: "array",
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
    defineField({
      name: "innholdstype",
      title: "Innholdstype",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "gp.innholdstype" }],
      options: {
        disableNew: true,
      },
    }),
    ingressField,
    defineField({
      title: "Innhold",
      name: "content",
      type: "riktekst_standard",
      group: "innhold",
    }),
    relevanteArtiklerField,
    BaseSEOPreset,
    skrivehjelp,
  ],
  orderings: [
    {
      title: "Tittel",
      name: "title",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "innholdstype.title",
      undertema: "undertema",
    },
    prepare({ title, subtitle, undertema }) {
      return {
        title,
        subtitle: `${subtitle} | ${undertema.length ?? 0} undertema`,
      };
    },
  },
});
