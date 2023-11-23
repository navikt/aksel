import { definePlugin } from "sanity";
import { deskTool } from "sanity/desk";
import innholdsType from "./innholdstype";
import { defaultDocumentNode, structure } from "./structure";
import tema from "./tema";
import temaTag from "./tema_tag";
/* import skosConcept from './skosConcept'
import skosConceptScheme from './skosConceptScheme'
import TreeView from './components/TreeView'
import {schemeFilter, branchFilter, HierarchyInput} from './helpers'

import {defaultDocumentNode, structure} from './structure'
import NodeTree from './components/NodeTree' */

/**
 * Defines a Sanity plugin for managing taxonomies.
 * baseURI should follow an IANA http/s scheme and should terminate with either a / or #.
 * @param options - Optional configuration options for the plugin.
 * @param options.baseUri - The base URI to use for SKOS concepts and concept schemes.
 * @returns A Sanity plugin object.
 */
const akselManager = definePlugin((options?: any) => {
  return {
    name: "taxonomyManager",
    options,
    schema: {
      types: [tema(), temaTag(), innholdsType()],
      templates: [
        {
          id: "book.by.author",
          title: "Book by author",
          description: "Book by a specific author",
          schemaType: "gp.tema.tag",
          parameters: [{ name: "authorId", type: "string" }],
          value: (params) => ({
            tema: { _type: "reference", _ref: params.authorId },
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
