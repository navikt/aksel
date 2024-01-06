import { defineArrayMember, defineField } from "sanity";
import { SANITY_API_VERSION } from "@/sanity/config";

export const gpTaxonomyObject = {
  title: "God praksis struktur (versjon 2)",
  name: "gp_taxonomy",
  type: "object",
  group: "staging",
  fields: [
    defineField({
      name: "innholdstype",
      title: "Innholdstype",
      type: "reference",
      to: [{ type: "gp.innholdstype" }],
      options: {
        disableNew: true,
      },

      /* Add required after update */
      /* validation: (Rule) => Rule.required(), */
    }),
    defineField({
      name: "undertema",
      title: "Undertema",
      type: "array",

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
  ],
};
