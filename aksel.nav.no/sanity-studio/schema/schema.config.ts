import type { ClientConfig } from "@sanity/client";
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "../sanity.env";

// biome-ignore lint/complexity/noStaticOnlyClass: single config namespace accessed via SchemaConfig.*
class SchemaConfig {
  static readonly baseConfig: ClientConfig = {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: false,
    apiVersion: SANITY_API_VERSION,
  };

  static readonly allArticleDocuments = [
    "komponent_artikkel",
    "ds_artikkel",
    "aksel_artikkel",
    "aksel_blogg",
    "aksel_prinsipp",
    "aksel_standalone",
    "templates_artikkel",
  ] as const;

  static readonly previews = [
    "aksel_artikkel",
    "komponent_artikkel",
    "ds_artikkel",
    "aksel_blogg",
    "aksel_prinsipp",
    "aksel_standalone",
    "templates_artikkel",
  ];

  static readonly landingsider = [
    { name: "godpraksis_landingsside", url: "god-praksis" },
    { name: "blogg_landingsside", url: "produktbloggen" },
    { name: "grunnleggende_landingsside", url: "grunnleggende" },
    { name: "templates_landingsside", url: "monster-maler" },
    { name: "komponenter_landingsside", url: "komponenter" },
    { name: "prinsipper_landingsside", url: "prinsipper" },
  ];

  static readonly allArticleDocsRef = SchemaConfig.allArticleDocuments.map(
    (x) => ({ type: x }),
  );

  static readonly komponentKategorier = [
    { title: "Primitives", value: "primitives" },
    { title: "Komponenter", value: "core" },
    { title: "Utilities", value: "utilities" },
    { title: "Dekoratøren", value: "dekoratoren" },
    { title: "Avviklet", value: "legacy" },
  ] as const;

  static readonly grunnleggendeKategorier = [
    { title: "Introduksjon", value: "introduksjon" },
    { title: "Brand", value: "brand" },
    { title: "Styling", value: "styling" },
    { title: "Guider", value: "guider" },
    { title: "Kode", value: "kode" },
    { title: "Migreringsguider", value: "migreringsguider" },
  ] as const;

  static readonly templatesKategorier = [
    { title: "Brev", value: "brev" },
    { title: "Støtte", value: "stotte" },
    { title: "Søknadsdialog", value: "soknadsdialog" },
  ] as const;

  static readonly bloggKategorier = [
    { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
    { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
    { title: "På reise", value: "pa-reise" },
  ] as const;

  static readonly prinsippKategorier = [
    { title: "Brukeropplevelse", value: "brukeropplevelse" },
  ];

  static categoryLookup(
    category: "komponenter" | "grunnleggende" | "templates",
  ) {
    const _category = category.toLowerCase();

    switch (_category) {
      case "komponenter":
        return SchemaConfig.komponentKategorier;
      case "grunnleggende":
        return SchemaConfig.grunnleggendeKategorier;
      case "templates":
        return SchemaConfig.templatesKategorier;
      default:
        return [];
    }
  }
}

type AllArticleDocumentsT = (typeof SchemaConfig.allArticleDocuments)[number];

export { SchemaConfig };
export type { AllArticleDocumentsT };
