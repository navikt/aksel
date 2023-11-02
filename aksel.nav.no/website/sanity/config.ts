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
  "templates_artikkel",
] as const;

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
  { title: "Core", value: "core" },
];

export const grunnleggendeKategorier = [
  { title: "Introduksjon", value: "introduksjon" },
  { title: "Styling", value: "styling" },
  { title: "Guider", value: "guider" },
  { title: "Design", value: "design" },
  { title: "Kode", value: "kode" },
];

export const templatesKategorier = [
  { title: "Mønster", value: "monster" },
  { title: "Maler", value: "maler" },
];

export const bloggKategorier = [
  { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
  { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
  { title: "På reise", value: "pa-reise" },
] as const;

export const prinsippKategorier = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];

export const sanityCategoryLookup = (
  category: "komponenter" | "grunnleggende" | "templates"
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
