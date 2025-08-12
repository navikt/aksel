import { ClientConfig } from "@sanity/client";

export const SANITY_PROJECT_ID = "hnbe3yhs";
export const SANITY_API_VERSION = "2025-08-10";
export const SANITY_DATASET = "development";

export const clientConfig: ClientConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  apiVersion: SANITY_API_VERSION,
};

export const allArticleDocuments = [
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
  "templates_artikkel",
] as const;

export type AllArticleDocumentsT = (typeof allArticleDocuments)[number];

export const previews = [
  "aksel_artikkel",
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
  "templates_artikkel",
];

export const landingsider = [
  { name: "godpraksis_landingsside", url: "god-praksis" },
  { name: "blogg_landingsside", url: "produktbloggen" },
  { name: "grunnleggende_landingsside", url: "grunnleggende" },
  { name: "templates_landingsside", url: "monster-maler" },
  { name: "komponenter_landingsside", url: "komponenter" },
  { name: "prinsipper_landingsside", url: "prinsipper" },
];

export const allArticleDocsRef = allArticleDocuments.map((x) => ({ type: x }));

export const komponentKategorier = [
  { title: "Primitives", value: "primitives" },
  { title: "Komponenter", value: "core" },
  { title: "Avviklet", value: "legacy" },
] as const;

export const grunnleggendeKategorier = [
  { title: "Introduksjon", value: "introduksjon" },
  { title: "Brand", value: "brand" },
  { title: "Styling", value: "styling" },
  { title: "Darkside", value: "darkside" },
  { title: "Guider", value: "guider" },
  { title: "Kode", value: "kode" },
] as const;

export const templatesKategorier = [
  { title: "Brev", value: "brev" },
  { title: "Støtte", value: "stotte" },
  { title: "Søknadsdialog", value: "soknadsdialog" },
] as const;

export const bloggKategorier = [
  { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
  { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
  { title: "På reise", value: "pa-reise" },
] as const;

export const prinsippKategorier = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];

export const sanityCategoryLookup = (
  category: "komponenter" | "grunnleggende" | "templates",
) => {
  const _category = category.toLowerCase();

  switch (_category) {
    case "komponenter":
      return komponentKategorier;
    case "grunnleggende":
      return grunnleggendeKategorier;
    case "templates":
      return templatesKategorier;
    default:
      return [];
  }
};
