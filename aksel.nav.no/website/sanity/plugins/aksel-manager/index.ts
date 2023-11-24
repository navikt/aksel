import { SANITY_API_VERSION } from "@/sanity/config";
import { definePlugin } from "sanity";
import { deskTool } from "sanity/desk";
import artikkel from "./documents/artikkel";
import innholdsType from "./documents/innholdstype";
import tema from "./documents/tema";
import undertema from "./documents/undertema";
import { defaultDocumentNode, structure } from "./structure";

export const GP_DOCUMENTS = [
  tema.name,
  undertema.name,
  innholdsType.name,
  artikkel.name,
];

const akselManager = definePlugin((options?: any) => {
  return {
    name: "taxonomyManager",
    options,
    schema: {
      types: [tema, undertema, innholdsType, artikkel],
      templates: [
        {
          id: "gp.tema.undertema.by.tema",
          title: "Undertema",
          schemaType: "gp.tema.undertema",
          parameters: [{ name: "id", type: "string" }],
          value: async (params, { getClient }) => {
            const title = await getClient({
              apiVersion: SANITY_API_VERSION,
            }).fetch(`*[_id == $title][0].title`, { title: params.id });
            return {
              tema: { _type: "reference", _ref: params.id },
              labels: title ? [title] : [],
            };
          },
        },
        {
          id: "gp.artikkel.by.tag",
          title: "God praksis aritkkel med tag",
          schemaType: "gp.artikkel",
          parameters: [{ name: "tag_id", type: "string" }],
          value: (params) => ({
            tags: [{ _type: "reference", _ref: params.tag_id }],
          }),
        },
        {
          id: "gp.artikkel.by.innholdstype",
          title: "God praksis aritkkel med innholdstype",
          schemaType: "gp.artikkel",
          parameters: [{ name: "id", type: "string" }],
          value: (params) => ({
            innholdstype: { _type: "reference", _ref: params.id },
          }),
        },
      ],
    },
    plugins: [
      deskTool({
        name: "aksel_taxonomy",
        title: "Aksel Taxonomy",
        structure,
        defaultDocumentNode,
      }),
    ],
  };
});

export { akselManager };
