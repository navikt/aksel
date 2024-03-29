import { definePlugin } from "sanity";
import { structureTool } from "sanity/structure";
import { publicationFlow } from "../publication-flow";
import innholdsType from "./documents/innholdstype";
import tema from "./documents/tema";
import undertema from "./documents/undertema";
import { defaultDocumentNode, structure } from "./structure";

export const GP_DOCUMENT_NAMES = [tema.name, undertema.name, innholdsType.name];

export const godPraksisTaxonomy = definePlugin(() => {
  return {
    name: "gp.taxonomy",
    schema: {
      templates: [
        {
          id: "gp.tema.undertema.by.tema",
          title: "Undertema",
          schemaType: "gp.tema.undertema",
          parameters: [{ name: "id", type: "string" }],
          value: async (params) => {
            return {
              tema: { _type: "reference", _ref: params.id },
            };
          },
        },
        {
          id: "gp.artikkel.by.undertema",
          title: "God praksis aritkkel med undertema",
          schemaType: "gp.artikkel",
          parameters: [{ name: "undertema_id", type: "string" }],
          value: (params) => ({
            undertema: [{ _type: "reference", _ref: params.undertema_id }],
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
      structureTool({
        name: "aksel_taxonomy",
        title: "Aksel Taxonomy",
        structure,
        defaultDocumentNode,
      }),
      /* Needs to be redefined here to avoid duplicate actions for documents */
      publicationFlow(),
    ],
  };
});
