export const allArticleDocuments = [
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
];

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

export const komponentKategorier = [
  { title: "Core", value: "core" },
  { title: "Interne", value: "interne" },
];

export const grunnleggendeKategorier = [
  { title: "Styling", value: "styling" },
  { title: "Guider", value: "guider" },
  { title: "Stæsj", value: "staesj" },
  { title: "Design", value: "design" },
  { title: "Kode", value: "kode" },
  { title: "Nedlastbart", value: "nedlastbart" },
];

export const monsterKategorier = [];

export const bloggKategorier = [
  { title: "Nytt fra teamene", value: "nytt-fra-teamene" },
  { title: "Da vi gjorde dette", value: "da-vi-gjorde-dette" },
  { title: "På reise", value: "pa-reise" },
];

export const prinsippKategorier = [
  { title: "Brukeropplevelse", value: "brukeropplevelse" },
];
