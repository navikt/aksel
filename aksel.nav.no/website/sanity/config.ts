export const clientConfig = {
  projectId: "hnbe3yhs",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-05-31",
};

export const allArticleDocuments = [
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
] as const;

export const previews = [
  "aksel_artikkel",
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
];

export const landingsider = [
  { name: "godpraksis_landingsside", url: "god-praksis" },
  { name: "blogg_landingsside", url: "produktbloggen" },
  { name: "grunnleggende_landingsside", url: "grunnleggende" },
  { name: "komponenter_landingsside", url: "komponenter" },
  { name: "prinsipper_landingsside", url: "prinsipper" },
];

export const allArticleDocsRef = allArticleDocuments.map((x) => ({ type: x }));

export const komponentKategorier = [{ title: "Core", value: "core" }];

export const grunnleggendeKategorier = [
  { title: "Introduksjon", value: "introduksjon" },
  { title: "Styling", value: "styling" },
  { title: "Guider", value: "guider" },
  { title: "Design", value: "design" },
  { title: "Kode", value: "kode" },
];

export const monsterKategorier = [];

export const bloggKategorier = [
  { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
  { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
  { title: "På reise", value: "pa-reise" },
] as const;

export const prinsippKategorier = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];

const allDocumentTypes = [
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
  "blogg_landingsside",
  "ds_artikkel",
  "godpraksis_landingsside",
  "grunnleggende_landingsside",
  "komponent_artikkel",
  "komponenter_landingsside",
  "prinsipper_landingsside",
  "aksel_forside",
];

export const allDocsRef = allDocumentTypes.map((x) => ({ type: x }));
